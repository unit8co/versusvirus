from flask import Flask
from flask_cors import CORS 
from flask import jsonify 

import datetime
 
app = Flask(__name__, static_url_path='', static_folder='../client/build/')
CORS(app)

@app.route('/time', methods=['GET']) 
def time():
    return jsonify({'time': datetime.datetime.now()})


@app.route('/')
def root():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True, threaded=True)
