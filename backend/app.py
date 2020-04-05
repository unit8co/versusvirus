from flask import Flask, Blueprint
from flask_cors import CORS 
from flask import jsonify 
from flask_restplus import Api, Resource
from flask_sqlalchemy import SQLAlchemy
import datetime
import sqlalchemy as db 
from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import mapper, sessionmaker
from sqlalchemy.interfaces import PoolListener
from sqlalchemy import inspect
from typing import Tuple, Dict


import sqlite3
from flask import g

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
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False, unique=True)
    cat_id = db.Column(db.Integer(), db.ForeignKey('user_cat.cat_id'), nullable=False, unique=False)
    mail = db.Column(db.String(128), nullable=False, unique=True)
    address = db.Column(db.String(256), nullable=False, unique=False)
    providers = db.relationship('Provider', uselist=False, backref='users', lazy=True)
    clients = db.relationship('Client', uselist=False, backref='users', lazy=True)

class Provider(db.Model):
    __tablename__ = "providers"
    user_id = db.Column(db.Integer(), db.ForeignKey('users.user_id'), primary_key=True)
    use_plastic_id_1 = db.Column(db.Boolean(), nullable=False)
    use_plastic_id_2 = db.Column(db.Boolean(), nullable=False)
    use_plastic_id_3 = db.Column(db.Boolean(), nullable=False)
    use_plastic_id_4 = db.Column(db.Boolean(), nullable=False)
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
    __tablename__ = "plastic_quality"
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
    print(User)
    metadata = MetaData(engine) 
    Session = sessionmaker(bind=engine)
    session = Session()
    print(session.query(Proposal).all())
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


@customer_api.route('/')
class CustomerList(Resource):
    '''Shows a list of all todos, and lets you POST to add new tasks'''
    @customer_api.doc('list_customers') 
    def get(self):
        '''Get all customers''' 
        users = jsonify([object_as_dict(user) for user in session.query(User).all()]) 
        print(users)
        return users

    @customer_api.doc('create_customer') 
    def post(self):
        '''Create a new customer'''
        return 'created customer'


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
                                        .all())
        providers = jsonify([joined_object_as_dict(entry, query_formatter) for entry in query_result]) 
        return providers

    @provider_api.doc('create_providers') 
    def post(self):
        '''Create a new provider'''
        return 'created providers'


@customer_api.route('/<int:customer_id>')
@customer_api.response(404, 'Customer not found')
@customer_api.param('customer_id', 'The customer identifier')
class Customer(Resource):
    '''Show a single todo item and lets you delete them'''
    @customer_api.doc('Get customer by id') 
    def get(self, customer_id):
        '''Get customer'''
        return 'get customer details' 

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
class Provider(Resource):
    '''Show a single todo item and lets you delete them'''
    @provider_api.doc('Get provider by id') 
    def get(self, provider_id):
        '''Get provider'''
        return 'get provider details' 

    @provider_api.doc('Get provider by id') 
    def put(self, provider_id):
        '''Update provider'''
        return 'update customer'

    @provider_api.doc('Get customer by id') 
    def delete(self, provider_id):
        '''Delete customer'''
        return 'delete customer details'
 

@provider_api.route('/<int:provider_id>/requests')
@provider_api.response(404, 'Requests for the provider not found')
@provider_api.param('provider_id', 'The customer identifier')
class ProviderRequests(Resource):
    '''Show a single todo item and lets you delete them'''
    @provider_api.doc('Get provider requests by id') 
    def get(self, provider_id):
        '''Get provider requests'''
        return 'get provider requests'

@provider_api.route('/<int:provider_id>/supplies') 
@provider_api.param('provider_id', 'The provicer identifier')
class ProviderSupplies(Resource):
    @provider_api.doc('Create supply from provider') 
    def put(self, provider_id):
        '''Create supply from provider'''
        return 'created supply from provider'

@user_type_api.route('/<int:user_id>')
@user_type_api.response(404, 'User not found')
@user_type_api.param('user_id', 'The user identifier')
class UserType(Resource):
    '''Show a request details'''
    @user_type_api.doc('Get user type by id') 
    def get(self, user_id):
        '''Get user type '''
        return 'get user type'


@request_api.route('/<int:request_id>')
@request_api.response(404, 'Request not found')
@request_api.param('request_id', 'The request identifier')
class Request(Resource):
    '''Show a request details'''
    @request_api.doc('Get request by id') 
    def get(self, request_api):
        '''Get request details'''
        return 'get request details'

    @request_api.doc('Delete request by id') 
    def delete(self, request_api):
        '''Delete request '''
        return 'get request details'



if __name__ == '__main__': 
    app.run(host='0.0.0.0', port=8080, debug=True, threaded=True) 