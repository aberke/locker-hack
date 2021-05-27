from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, static_folder='./../frontend/public')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lockers.db'
app.config['SECRET_KEY'] = "change me to random string in env variable"
db = SQLAlchemy(app)


from models import Locker, Ask


@app.route('/blog')
def blog_redirect():
    return 'Hello, World!' # Todo


# API

@app.route('/api/asks', methods=['GET'])
def api_get_asks():
    """
    Returns all of the ask items, filtered to tags in the URL parameters
    """
    return {"asks": [{"TO":"DO"}, {"TO":"DO"}]}

# GET ask
@app.route('/api/ask/<int:id>', methods=['POST'])
def api_get_ask(ask_id):
    return 'TODO'

# GET ask
@app.route('/api/ask/<int:id>', methods=['DELETE'])
def api_delete_ask(ask_id):
    return 'TODO'




# POST new ask
@app.route('/api/ask', methods=['POST'])
def api_post_ask():
    return 'TODO'





@app.route('/api/referal', methods=['POST'])
def referral(url):
    # TODO
    # what was our plan here?
    pass

