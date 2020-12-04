from flask import render_template, make_response, request, jsonify
from app import app, api
from flask_restx import Resource


@api.route("/chartData")
class ChartPage(Resource):

    def get(self):
        return jsonify({"data":"Hello data"})
        pass

    def post(self):
        pass
