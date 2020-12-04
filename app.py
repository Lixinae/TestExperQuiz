import os

from flask import Flask
from flask_restx import Api
credential_path = "D:\google_key\My First Project-f7da1c12796a.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

app = Flask(__name__)

api = Api(app, version="1.0", title="API Chart", description="The api to fet chart data", prefix="/api", doc="/api", )

from api_routes import *
from routes import *

if __name__ == '__main__':
    app.run()
