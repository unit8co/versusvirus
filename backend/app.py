from flask import Flask, Blueprint
from flask_cors import CORS 
from flask import jsonify  
from flask_restplus import Api, Resource
from flask_sqlalchemy import SQLAlchemy 
from flask_restplus import Api, Resource, fields 
import datetime
from flask import request
import sqlalchemy as db 
from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import mapper, sessionmaker
from sqlalchemy.interfaces import PoolListener
from sqlalchemy import inspect
from typing import Tuple, Dict


import sqlite3
from flask import g

def flatten(dict_list):
    return {k: v for d in dict_list for k, v in d.items()}

def reverse(d):
    return {v: k for k, v in d.items()}


DATABASE = 'db/database.db'

def create_app():
    blueprint = Blueprint('api', __name__, url_prefix='/api/v1')
    app = Flask(__name__, static_url_path='', static_folder='../client/build/')
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DATABASE}"
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'connect_args': {'check_same_thread': False}}
    app.register_blueprint(blueprint)
    CORS(app)
    return app

app = create_app()
db = SQLAlchemy(app)

@app.route('/')
def static_files():
    return app.send_static_file('index.html')
    
api = Api(app, 
    version='1.0', 
    title='Covid app API',
    doc='/swagger/',
    description='An API for the app that matches medical suppliers with hospitals',
    prefix='/api/v1'
)

customer_api = api.namespace('customers', description='Customer APIs')
provider_api = api.namespace('providers', description='Provider APIs')
user_type_api = api.namespace('users-type', description='User Type APIs')
request_api = api.namespace('requests', description='Request APIs')

class UserCat(db.Model):
    __tablename__ = "user_cat"
    cat_id = db.Column(db.Integer(), primary_key=True)
    label = db.Column(db.String(256), nullable=False)
    users = db.relationship('User', backref='user_cat', lazy=True)
 
class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer(), primary_key=True)
    user_name = db.Column(db.String(50), nullable=False, unique=True)
    cat_id = db.Column(db.Integer(), db.ForeignKey('user_cat.cat_id'), nullable=False, unique=False)
    mail = db.Column(db.String(128), nullable=False, unique=True)
    address = db.Column(db.String(256), nullable=False, unique=False)
    providers = db.relationship('Provider', uselist=False, backref='users', lazy=True)
    clients = db.relationship('Client', uselist=False, backref='users', lazy=True)

class Provider(db.Model):
    __tablename__ = "providers"
    user_id = db.Column(db.Integer(), db.ForeignKey('users.user_id'), primary_key=True)
    use_plastic_id_1 = db.Column(db.Integer(), nullable=False)
    use_plastic_id_2 = db.Column(db.Integer(), nullable=False)
    use_plastic_id_3 = db.Column(db.Integer(), nullable=False)
    use_plastic_id_4 = db.Column(db.Integer(), nullable=False)
    proposals = db.relationship('Proposal', backref='providers', lazy=True)

class Client(db.Model):
    __tablename__ = "clients"
    user_id = db.Column(db.Integer(), db.ForeignKey('users.user_id'), primary_key=True)
    is_approved = db.Column(db.Boolean(), nullable=False)
    requests = db.relationship('Request', backref='clients', lazy=True)

class Product(db.Model):
    __tablename__ = "products"
    product_id = db.Column(db.Integer(), primary_key=True)
    product_name = db.Column(db.String(256),nullable=False, unique=True)
    requests = db.relationship('Request', backref='products', lazy=True)

class PlasticQuality(db.Model):
    __tablename__ = "plastics_quality"
    plastic_id = db.Column(db.Integer(), primary_key=True)
    plastic_name = db.Column(db.String(256), nullable=False, unique=True)

class RequestStatus(db.Model):
    __tablename__ = "request_status"
    status_id = db.Column(db.Integer(), primary_key=True)
    status_label = db.Column(db.String(256), nullable=False, unique=True)
    requests = db.relationship('Request', backref='request_status', lazy=True)

class Request(db.Model):
    __tablename__ = "requests"
    request_id = db.Column(db.Integer(), primary_key=True)
    product_id = db.Column(db.Integer(), db.ForeignKey('products.product_id'),nullable=False)
    client_id = db.Column(db.Integer(), db.ForeignKey('clients.user_id'), nullable=False)
    request_quantity = db.Column(db.Integer(), nullable=False)
    status_id = db.Column(db.Integer(), db.ForeignKey('request_status.status_id'), nullable=False)
    proposals = db.relationship('Proposal', backref='requests', lazy=True)

class ProposalStatus(db.Model):
    __tablename__ = "proposal_status"
    status_id = db.Column(db.Integer(), primary_key=True)
    status_label = db.Column(db.String(256),nullable=False, unique=True)
    proposals = db.relationship('Proposal', backref='proposal_status', lazy=True)

class Proposal(db.Model):
    __tablename__ = "proposals"
    proposal_id = db.Column(db.Integer(), primary_key=True)
    request_id = db.Column(db.Integer(), db.ForeignKey('requests.request_id'), nullable=False)
    provider_id = db.Column(db.Integer(), db.ForeignKey('providers.user_id'), nullable=False)
    plastic_id = db.Column(db.Integer(), db.ForeignKey('plastics_quality.plastic_id'), nullable=False)
    proposal_quantity = db.Column(db.Integer(), nullable=False)
    status_id = db.Column(db.Integer(), db.ForeignKey('proposal_status.status_id'), nullable=False)


def loadSession():
    """"""     
    engine = db.engine
    engine.execute('pragma foreign_keys=on')    
    print(engine.table_names())
    metadata = MetaData(engine) 
    Session = sessionmaker(bind=engine)
    session = Session()

    return session 

session = loadSession()
res = session.query(User).all()

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}
 
def joined_object_as_dict(obj: Tuple[object], tables_selected_columns: Tuple[Dict[str, str]]):
    res = {}
    for entry_tables, table_columns_mapping in zip(obj, tables_selected_columns):
        for column_name, result_name in table_columns_mapping.items():
            res[result_name] = getattr(entry_tables, column_name)
    
    return res
 
userCategories = [object_as_dict(userCat) for userCat in session.query(UserCat).all()]
userCategoriesRev = { elt['label'] : elt['cat_id'] for elt in userCategories }
         
customer_fields = api.model('Resource', {
    'username': fields.String,
    'cat_id': fields.String,
    'mail': fields.String,
    'address': fields.String,
    'is_approved': fields.Boolean
}) 

client_query_formatter = (
    # For User table
    {
        "user_id": "user_id",
        "user_name": "username",
        "mail": "mail",
        "address": "address",
    },
    # For user_cat table
    {
        "label": "label"
    },
    # For client details table
    {
        "is_approved": "is_approved",
    }
)

def create_user(payload):
    user = User(user_name=payload["username"],
                cat_id=payload["cat_id"],
                mail=payload["mail"],
                address=payload["address"])
    return user

def create_client(payload, user):  
    new_client = Client(user_id=user.user_id,
                        is_approved=payload["is_approved"])
    return new_client


def all_clients():
    query_result = (session.query(User, UserCat, Client)
                                    .join(UserCat)
                                    .join(Client)
                                    .filter(UserCat.label == "CLIENTS") # Making sure it is a client 
                                    .all())
    customer = jsonify([joined_object_as_dict(entry, client_query_formatter) for entry in query_result]) 
    return customer

def get_client(client_id): 
    query_result = (session.query(User, UserCat, Client)
                                    .join(UserCat)
                                    .join(Client)
                                    .filter(UserCat.label == "CLIENTS") # Making sure it is a client
                                    .filter(User.user_id == client_id)
                                    .all())
    customer = jsonify([joined_object_as_dict(entry, client_query_formatter) for entry in query_result]) 
    return customer

@customer_api.route('/')
class CustomerList(Resource):
    '''Shows a list of all todos, and lets you POST to add new tasks'''
    @customer_api.doc('list_customers') 
    def get(self):
        '''Get all customers''' 
        return all_clients()

    @customer_api.doc('create_customer') 
    @customer_api.expect(customer_fields, validate=False)
    @api.response(201, 'Customer created succesfully')
    def post(self):
        '''Create a new customer'''
        new_user = create_user(request.json)
        db.session.add(new_user) 
        # new_client = create_client(request.json, new_user)  
        # db.session.add(new_client)
        db.session.commit()  
        return None, 201



@provider_api.route('/')
class ProviderList(Resource):
    '''Shows a list of all todos, and lets you POST to add new tasks'''
    @provider_api.doc('list_providers') 
    def get(self):
        '''Get all providers'''
        query_formatter = (
            # For User table
            {
                "user_id": "user_id",
                "user_name": "username",
                "mail": "mail",
                "address": "address",
            },
            # For user_cat table
            {
                "label": "label"
            }
        )
        query_result = (session.query(User, UserCat)
                                        .join(UserCat)
                                        .filter(UserCat.label == "PROVIDER")
                                        .all())
        providers = jsonify([joined_object_as_dict(entry, query_formatter) for entry in query_result]) 
        return providers

    @provider_api.doc('create_providers') 
    def post(self, payload):
        '''Create a new provider'''
        # Creating the user entry
        new_user = User(user_name=payload["username"],
                        cat_id=payload["cat_id"],
                        mail=payload["mail"],
                        address=payload["address"])
        db.session.add(new_user)

        # Creating the provider detailed entry
        new_provider = Provider(user_id=new_user.user_id,
                                use_plastic_id_1=payload["use_plastic_id_1"],
                                use_plastic_id_2=payload["use_plastic_id_2"],
                                use_plastic_id_3=payload["use_plastic_id_3"],
                                use_plastic_id_4=payload["use_plastic_id_4"])

        db.session.add(new_provider)
        db.session.commit()
        return None


@customer_api.route('/<int:client_id>')
@customer_api.response(404, 'Customer not found')
@customer_api.param('client_id', 'The customer identifier')
class Customer(Resource):
    '''Show a single todo item and lets you delete them'''
    @customer_api.doc('Get customer by id') 
    def get(self, client_id):
        '''Get customer'''
        return get_client(client_id)

    @customer_api.doc('Get customer by id') 
    def put(self, customer_id):
        '''Update ustomer'''
        return 'update customer'

    @customer_api.doc('Get customer by id') 
    def delete(self, customer_id):
        '''Delete customer'''
        return 'delete customer details'


@customer_api.route('/<int:customer_id>/requests')
@customer_api.response(404, 'Requests for the customer not found')
@customer_api.param('customer_id', 'The customer identifier')
class CustomerRequests(Resource):
    '''Show a single todo item and lets you delete them'''
    @customer_api.doc('Get customer by id') 
    def get(self, customer_id):
        '''Get customer requests'''
        return 'get customer requests'

    @customer_api.doc('Create request for customer') 
    def put(self, customer_id):
        '''Create request for customer'''
        return 'created request for customer'


@provider_api.route('/<int:provider_id>')
@provider_api.response(404, 'Provider not found')
@provider_api.param('provider_id', 'The customer identifier')
class ProviderAPI(Resource):
    '''Show a single todo item and lets you delete them'''
    @provider_api.doc('Get provider by id') 
    def get(self, provider_id):
        '''Get providers by id'''
        query_formatter = (
            # For User table
            {
                "user_id": "user_id",
                "user_name": "username",
                "mail": "mail",
                "address": "address",
            },
            # For user_cat table
            {
                "label": "label"
            },
            # For provider details table
            {
                "use_plastic_id_1": "use_plastic_id_1",
                "use_plastic_id_2": "use_plastic_id_2",
                "use_plastic_id_3": "use_plastic_id_3",
                "use_plastic_id_4": "use_plastic_id_4",
            }
        )
        query_result = (session.query(User, UserCat, Provider)
                                        .join(UserCat)
                                        .join(Provider)
                                        .filter(UserCat.label == "PROVIDER") # Making sure it is a provider
                                        .filter(User.user_id == provider_id)
                                        .all())
        provider = jsonify([joined_object_as_dict(entry, query_formatter) for entry in query_result]) 
        return provider

    @provider_api.doc('Get provider by id') 
    def put(self, provider_id):
        '''Update provider'''
        return 'update customer'

    @provider_api.doc('Get customer by id') 
    def delete(self, provider_id):
        '''Delete customer'''
        return 'delete customer details'
 

@provider_api.route('/<int:provider_id>/proposals')
@provider_api.response(404, 'Proposals for the provider not found')
@provider_api.param('provider_id', 'The customer identifier')
class ProviderProposals(Resource):
    '''Related to the proposals'''
    @provider_api.doc('Get provider requests by id') 
    def get(self, provider_id):
        '''Get provider requests'''
        query_formatter = (
            # For proposal table
            {
                "proposal_id": "proposal_id",
                "request_id": "request_id",
                "provider_id": "provider_id",
                "plastic_id": "plastic_id",
                "proposal_quantity": "proposal_quantity",
                "status_id": "status_id",
            },
            # For Request table
            {
                "client_id": "request_client_id",
                "product_id": "request_product_id",
                "request_quantity": "requested_quantity",
            },
            # For RequestStatus table
            {
                "status_label": "request_status",
            },
            # For user table
            {
                "user_name": "client_name",
            },
            # For proposal status table
            {
                "status_label": "proposal_status",
            },
            # For plastic table
            {
                "plastic_name": "proposal_plastic_name",
            },
        )
        query_result = (session.query(Proposal, Request, RequestStatus, User, ProposalStatus, PlasticQuality)
                                        .join(Request, Proposal.request_id == Request.request_id)
                                        .join(RequestStatus, Request.status_id == RequestStatus.status_id)
                                        .join(User, Request.client_id == User.user_id)
                                        .join(ProposalStatus, Proposal.status_id == ProposalStatus.status_id)
                                        .join(PlasticQuality, Proposal.plastic_id == PlasticQuality.plastic_id)
                                        .filter(Proposal.provider_id == provider_id)
                                        .all())
        proposals = jsonify([joined_object_as_dict(entry, query_formatter) for entry in query_result]) 
        return proposals

    def put(self, provider_id):
        '''Create Proposal from provider'''
        return 'created Proposal from provider'

@user_type_api.route('/<int:user_id>')
@user_type_api.response(404, 'User not found')
@user_type_api.param('user_id', 'The user identifier')
class UserType(Resource):
    '''Show a request details'''
    @user_type_api.doc('Get user type by id') 
    def get(self, user_id):
        '''Get user type '''
        userCategoriesIdLabel = reverse(userCategoriesRev)
        try: 
            user_cat = userCategoriesIdLabel[session.query(User).get(user_id).cat_id]
            return jsonify({'category': user_cat})
        except:
            return jsonify({'category': 'unknown'})

        


@request_api.route('/<int:request_id>')
@request_api.response(404, 'Request not found')
@request_api.param('request_id', 'The request identifier')
class RequestAPI(Resource):
    '''Show a request details'''
    @request_api.doc('Get request by id') 
    def get(self, request_id):
        '''Get request by id'''
        query_formatter = (
            # For Request table
            {
                "request_id": "request_id",
                "product_id": "product_id",
                "client_id": "client_id",
                "request_quantity": "request_quantity",
                "status_id": "status_id",
            },
            # For Product table
            {
                "product_name": "product_name",
            },
            # For User table
            {
                "user_name": "client_name"
            },
        )
        query_result = (session.query(Request, Product, User)
                                        .join(Product, Request.product_id == Product.product_id)
                                        .join(User, Request.client_id == User.user_id)
                                        .filter(Request.request_id == request_id)
                                        .all())
        request = jsonify(joined_object_as_dict(query_result[0], query_formatter)) 
        return request

    @request_api.doc('Delete request by id') 
    def delete(self, request_api):
        '''Delete request '''
        return 'get request details'



if __name__ == '__main__': 
    app.run(host='0.0.0.0', port=8080, debug=True, threaded=True) 