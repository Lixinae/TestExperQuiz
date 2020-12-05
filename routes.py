from flask import render_template, make_response
from app import app


@app.route('/')
def base_page():
    return make_response(render_template('body.html', title="base"), 200)



