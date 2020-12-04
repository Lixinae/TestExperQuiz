from flask import Flask, make_response, render_template

app = Flask(__name__)


@app.route('/hello')
def hello_world():
    return 'Hello World!'


@app.route("/")
def base_page():
    return make_response(render_template('body.html', title="base"), 200)


if __name__ == '__main__':
    app.run()
