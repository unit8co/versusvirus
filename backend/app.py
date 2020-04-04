from flask import Flask
from flask_cors import CORS 
from flask import jsonify

from api.api import api
from api.models import db
from api.config import Config 

import datetime

# def create_app(config):
#     app = Flask(__name__)
#     CORS(app)
#     # app.config.from_object(config)
#     # register_extensions(app)
#     return app


# def register_extensions(app):
#     api.init_app(app)
#     db.init_app(app)

# app = create_app(Config)


app = Flask(__name__)
CORS(app)

@app.route('/time', methods=['GET']) 
def time():
    return jsonify({'time': datetime.datetime.now()})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)


#     from flask import Flask, url_for
# from flask import jsonify

# import datetime

# app = Flask(__name__)
 
# @app.route('/time')
# def time():
#     return jsonify({'time': datatime.datatime.now()})
 
# if __name__ == '__main__':
#     app.run()
