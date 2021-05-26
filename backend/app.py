from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lockers.db'
db = SQLAlchemy(app)

from models import Locker, Ask




@app.route('/')
def blog_redirect():
    # Todo
    return 'Hello, World!'


@app.route('/index')
def index():
    return render_template('index.html')


# initial stuff above
# mapped out   URLs below


# User seen endpoints

# go here

@app.route('/ask')
def ask():
    """
    Returns page for user to make a ask.
    POSTs to /api/ask
    """
    return 'This is the page to make an ask'


@app.route('/buy/<int:ask_id>/')
def buy(ask_id):
    pass



## Error handling

@app.errorhandler(404)
def page_not_found(e):
    # set the 404 status explicitly
    return render_template('404.html'), 404



# API


@app.route('/api/asks', methods=['GET'])
def api_asks():
    """
    Returns all of the ask items, filtered to tags in the URL parameters
    """
    pass


# POST ask
@app.route('/api/ask', methods=['GET', 'POST'])
def api_ask(item_url):
    if request.method == 'POST':
        # TODO
        # create or  update the ask object
        return 'POST ASK'
    else:
        # return the ask object
        return 'GET ASK'


@app.route('/api/referal', methods=['POST'])
def referral(url):
    # TODO
    pass

