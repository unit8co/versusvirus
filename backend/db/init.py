import sqlite3

conn = sqlite3.connect('database.db', isolation_level=None)
print("Opened database successfully")

# Creating user cat table
conn.execute("""CREATE TABLE user_cat (cat_id INTEGER PRIMARY KEY,
                                       label TEXT NOT NULL)""")
# Populating user cat table
conn.execute("""INSERT INTO user_cat (cat_id, label)
                VALUES
                    (1, "PROVIDER"),
                    (2, "CLIENT")  ;""")

# Creating user table
conn.execute("""CREATE TABLE users (user_id INTEGER PRIMARY KEY,
                                    user_name TEXT NOT NULL UNIQUE,
                                    cat_id INTEGER NOT NULL, 
                                    mail TEXT NOT NULL UNIQUE, 
                                    address TEXT NOT NULL, 
                                    FOREIGN KEY (cat_id) REFERENCES user_cat (cat_id))""")
# Populating user table
conn.execute("""INSERT INTO users (user_id, user_name, cat_id, mail, address)
                VALUES
                    (1, "JohnDoe",    1, "johndoe@mail.com",       "3, This Street, 0000 Switzerland CH")           ,
                    (2, "JaneDoe",    1, "janedoe@mail.com",       "4, That Street, 2nd Floor, 0000 Switzerland CH"),
                    (3, "JacKDoE",    1, "jackdoe@mail.com",       "4, Taht Street, 3rd Floor, 0000 Switzerland CH"),
                    (4, "Hospital A", 2, "contact@hospital_a.com", "34, Other Street, 0000 Switzerland CH")         ,
                    (5, "Hospital B", 2, "contact@hospital_b.com", "44, This Place, 0000 Switzerland CH")           ,
                    (6, "Nurse C",    2, "nurse@mail.com",         "4, This Other Street, 0000 Switzerland CH")     ;""")

# Creating providers detailed table
conn.execute("""CREATE TABLE providers (user_id INTEGER PRIMARY KEY,
                                       use_plastic_id_1 INTEGER NOT NULL,
                                       use_plastic_id_2 INTEGER NOT NULL,
                                       use_plastic_id_3 INTEGER NOT NULL,
                                       use_plastic_id_4 INTEGER NOT NULL,
                                       FOREIGN KEY (user_id) REFERENCES users (user_id))""")
conn.execute("""INSERT INTO providers (user_id, use_plastic_id_1, use_plastic_id_2, use_plastic_id_3, use_plastic_id_4)
                VALUES
                    (1, 1, 1, 0, 0),
                    (2, 0, 1, 1, 0),
                    (3, 0, 1, 0, 1);""")

# Creating clients detailed table
conn.execute("""CREATE TABLE clients (user_id INTEGER PRIMARY KEY,
                                      is_approved INTEGER NOT NULL,
                                      FOREIGN KEY (user_id) REFERENCES users (user_id))""")
conn.execute("""INSERT INTO clients (user_id, is_approved)
                VALUES
                    (4, 1),
                    (5, 0),
                    (6, 1);""")

# Populating product table
conn.execute("""CREATE TABLE products (product_id INTEGER PRIMARY KEY,
                                       product_name TEXT NOT NULL)""")
conn.execute("""INSERT INTO products (product_id, product_name)
                VALUES
                    (1, "Product A"),
                    (2, "Product B"),
                    (3, "Product C");""")

# Creating and populating plastics table
conn.execute("""CREATE TABLE plastics_quality (plastic_id integer PRIMARY KEY,
                                              plastic_name TEXT NOT NULL)""")
conn.execute("""INSERT INTO plastics_quality (plastic_id, plastic_name)
                VALUES
                    (1, "ASA - Antimicrobic"),
                    (2, "PET-G")             ,
                    (3, "ABS")               ,
                    (4, "PLA")               ;""")

# Creating status table
conn.execute("""CREATE TABLE request_status (status_id INTEGER PRIMARY KEY, 
                                             status_label TEXT NOT NULL)""")
conn.execute("""INSERT INTO request_status (status_id, status_label)
                VALUES
                    (1, "OPENED") ,
                    (2, "SATISFIED"),
                    (3, "EXPIRED");""")

# Creating and populating requests table
# TODO: add timestamps
conn.execute("""CREATE TABLE requests (request_id INTEGER PRIMARY KEY,
                                       product_id INTEGER NOT NULL,
                                       client_id INTEGER,
                                       request_quantity INTEGER NOT NULL,
                                       status_id INTEGER NOT NULL,
                                       FOREIGN KEY (client_id) REFERENCES clients (user_id),
                                       FOREIGN KEY (product_id) REFERENCES products (product_id),
                                       FOREIGN KEY (status_id) REFERENCES request_status (status_id))""")
conn.execute("""INSERT INTO requests (request_id, product_id, client_id, request_quantity, status_id)
                VALUES
                    (1, 1, 4, 100, 1),
                    (2, 1, 5, 200, 1),
                    (3, 2, 6,   1, 1),
                    (4, 3, 4,  50, 3),
                    (5, 3, 5,  25, 1),
                    (6, 3, 4,  25, 1),
                    (7, 2, 4,  75, 2);""")

# Creating status table
conn.execute("""CREATE TABLE proposal_status (status_id INTEGER PRIMARY KEY, 
                                              status_label TEXT NOT NULL)""")
conn.execute("""INSERT INTO proposal_status (status_id, status_label)
                VALUES
                    (1, "PENDING") ,
                    (2, "APPROVED"),
                    (3, "REJECTED");""")

conn.execute("""CREATE TABLE proposals (proposal_id INTEGER PRIMARY KEY,
                                        request_id INTEGER NOT NULL,
                                        provider_id INTEGER NOT NULL,
                                        plastic_id INTEGER NOT NULL,
                                        proposal_quantity INTEGER NOT NULL,
                                        status_id INTEGER NOT NULL,
                                        FOREIGN KEY (request_id) REFERENCES requests (request_id),
                                        FOREIGN KEY (provider_id) REFERENCES providers (user_id),
                                        FOREIGN KEY (plastic_id) REFERENCES plastics_quality (plastic_id),
                                        FOREIGN KEY (status_id) REFERENCES proposal_status (status_id))""")
conn.execute("""INSERT INTO proposals (proposal_id, request_id, provider_id, plastic_id, proposal_quantity, status_id)
                VALUES
                    ( 1, 1, 1, 1, 100, 1),
                    ( 2, 1, 1, 2, 200, 1),
                    ( 3, 1, 2, 3,  50, 1),
                    ( 4, 1, 3, 2,  50, 1),
                    ( 5, 2, 3, 2,  25, 3),
                    ( 6, 2, 3, 4,  25, 1),
                    ( 7, 3, 2, 4,   1, 1),
                    ( 8, 4, 3, 2,  25, 3),
                    ( 9, 7, 3, 4,  25, 1),
                    (10, 7, 2, 4,  75, 1),
                    (11, 7, 3, 2,  25, 3),
                    (12, 6, 3, 4,  25, 1),
                    (13, 5, 2, 4,  75, 1);""")

print("Tables created successfully")
conn.close()