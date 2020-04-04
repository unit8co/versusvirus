CREATE TABLE users ( 
    firstname VARCHAR(100) NOT NULL, 
    lastname VARCHAR(100) NOT NULL, 
    category VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    address VARCHAR(100) NOT NULL, 
    geolocation VARCHAR(100) NOT NULL
);

INSERT INTO users VALUES ('john', 'kowalski', 'customer', 'john.kowalski@gmail.com', 'Lincoln Street 67, ST04 FDE London', '40:26:46.302N 079:58:55.903W');
INSERT INTO users VALUES ('mary', 'kowalski', 'customer', 'mary.kowalski@gmail.com', 'Lincoln Street 67, ST04 FDE Geneva', '43:26:46.302N 079:58:55.903W');
INSERT INTO users VALUES ('john', 'smith',    'provider', 'john.smith@gmail.com', 'Lincoln Street 67, ST04 FDE New York', '45:26:46.302N 079:58:55.903W');