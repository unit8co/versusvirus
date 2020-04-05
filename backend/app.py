from flask import Flask, Blueprint
from flask_cors import CORS 
from flask import jsonify 
from flask_restplus import Api, Resource
import datetime
import sqlalchemy as db 
from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import mapper, sessionmaker
from sqlalchemy import inspect


import sqlite3
from flask import g

DATABASE = 'db/database.db'

def create_app():
    blueprint = Blueprint('api', __name__, url_prefix='/api/v1')
    app = Flask(__name__, static_url_path='', static_folder='../client/build/')
    app.register_blueprint(blueprint)
    CORS(app)
    return app

app = create_app()

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
 
class User(object):
    pass

def loadSession():
    """"""     
    engine = create_engine('sqlite:///%s' % DATABASE, echo=True, connect_args={'check_same_thread': False})
    print(engine.table_names())
    metadata = MetaData(engine) 
    moz_bookmarks = Table('users', metadata, autoload=True)
    mapper(User, moz_bookmarks)
    
    Session = sessionmaker(bind=engine)
    session = Session()
    return session 

session = loadSession()
res = session.query(User).all()

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

@customer_api.route('/')
class CustomerList(Resource):
    '''Shows a list of all todos, and lets you POST to add new tasks'''
    @customer_api.doc('list_customers') 
    def get(self):
        '''Get all customers''' 
        users = jsonify([object_as_dict(user) for user in session.query(User).all()]) 
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
        return 'all providers'

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