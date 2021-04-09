from flask import Flask, request, render_template
app = Flask(__name__)


@app.route('/')
def blog_redirect():
    # Todo
    return 'Hello, World!'


@app.route('/hello')
def hello_world():
    return 'Hello, World!'

@app.route('/ask-buy')
def ask_buy():
	return render_template('ask_buy.html')


# initial stuff above
# mapped out   URLs below


# User seen endpoints

# go here

@app.route('/ask/')
def ask():
	"""
	Returns page for user to make a ask.
	POSTs to /api/ask
	"""
	return 'This is the page to make an ask'


@app.route('/buy/<int:ask_id>/')
def buy(ask_id):
	pass




# API


@app.route('/api/asks', methods=['GET'])
def api_asks():
	"""
	Returns all of the ask items, filtered to tags in the URL parameters
	"""
	pass



# POST ask
@app.route('/api/ask', methods=['GET','POST'])
def api_ask(item_url):
	if request.method == 'POST':
		# TODO
		# create or  update the ask object
		return 'POST ASK'
	else:
		# return the ask object
		return 'GET ASK'

