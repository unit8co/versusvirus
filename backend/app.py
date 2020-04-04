from flask import Flask
from flask_cors import CORS 
from flask import jsonify 

import datetime
 
app = Flask(__name__)
CORS(app)

@app.route('/time', methods=['GET']) 
def time():
    return jsonify({'time': datetime.datetime.now()})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)
