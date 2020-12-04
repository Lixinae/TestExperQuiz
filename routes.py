from flask import render_template, make_response, request, jsonify
from app import app
from flask_restx import Resource


@app.route('/')
def base_page():
    return make_response(render_template('body.html', title="base"), 200)



