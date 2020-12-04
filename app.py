from flask import Flask
from flask_restx import Api

app = Flask(__name__)

api = Api(app, version="1.0", title="API Chart", description="The api to fet chart data", prefix="/api", doc="/api", )

from api_routes import *
from routes import *

if __name__ == '__main__':
    app.run()
