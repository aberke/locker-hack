# Good resource to build this out:
# https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project

from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__, static_folder='./../frontend/public')
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)



import models


@app.route('/blog')
def blog_redirect():
    return 'Hello, World!' # Todo


# API

@app.route('/api/asks', methods=['GET'])
def api_get_asks():
    """
    Returns all of the ask items, filtered to tags in the URL parameters
    """
    return { "asks": [{"TO":"DO"}, {"TO":"DO"}] }, 200


# POST new ask
@app.route('/api/ask', methods=['POST'])
def api_post_ask():
    return 'TODO', 201


# GET ask
@app.route('/api/ask/<int:id>', methods=['GET'])
def api_get_ask(id):
    return 'TODO', 200


# POST ask
@app.route('/api/ask/<int:ask_id>/note', methods=['POST'])
def api_post_note(ask_id):
    """Adds a note to the notes list for the ask."""
    return 'TODO'


# UPDATE ask
@app.route('/api/ask/<int:id>', methods=['UPDATE'])
def api_update_ask(id):
    return 'TODO: only allow if code present or basic user auth'


# DELETE ask
@app.route('/api/ask/<int:id>', methods=['DELETE'])
def api_delete_ask(id):
    return 'TODO: only allow if code present or basic user auth'




@app.route('/api/referal', methods=['POST'])
def referral(url):
    # TODO - and what was our plan here?
    pass

