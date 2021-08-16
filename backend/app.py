# Good resource to build this out:
# https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project

import util
import notifications
from models import Ask, Note, NoteTypes
from errors import bad_request
from flask import Flask, request, jsonify, url_for, send_from_directory
import os

from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from database import db

app = Flask(__name__, static_folder='./../frontend/public')
app.config.from_object(Config)
#db = SQLAlchemy(app)
db.init_app(app) 
migrate = Migrate(app, db)


@app.route('/blog')
def blog_redirect():
    return 'Hello, World!' # Todo
   
@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('./../frontend/public', path)


# API
@app.route('/api/asks', methods=['GET'])
def api_get_asks():
    """
    Returns all of the ask items, filtered by the URL parameters.
    """
    # TODO: query for asks by place ids and other parameters 
    # base query is for all asks
    asks_query = Ask.query
    ids = request.args.get('ids')
    if ids and len(ids):
        ids = [int(id) for id in ids.split(',')]
        asks_query = asks_query.filter(Ask.id.in_(ids))
    asks = asks_query.order_by(Ask.created.desc()).all() # TODO: paginate
    return jsonify({"asks": [ask.to_dict() for ask in asks]})


@app.route('/api/ask', methods=['POST'])
def api_post_ask():
    """
    POST new ask
    TODO in future: support tags
    Returns newly created ask for error
    """
    data = request.get_json() or {}
    # validate POST - do this more? e.g. check code, asin, place id are correct length
    required_fields = ['item_asin', 'locker_place_id', 'code']
    if not all(r in data for r in required_fields):
        return bad_request('must include ' + ', '.join(required_fields) + ' fields')
    ask = Ask()
    for field in required_fields + ['item_url', 'item_name', 'quantity', 'price']:
        if field in data:
            setattr(ask, field, data[field])
    db.session.add(ask)
    db.session.add(Note(text=data['note'], ask=ask))
    db.session.commit()
    ask_url = util.get_ask_url_with_code(ask)
    response = jsonify(ask.to_dict())
    response.headers['Location'] = ask_url
    return response, 201


@app.route('/api/ask/<int:ask_id>/asker-email', methods=['POST', 'PUT'])
def api_post_asker_email(ask_id):
    """
    PUT/POST email for asker
    """
    ask = Ask.query.get_or_404(ask_id)
    data = request.get_json() or {}
    if 'asker_email' not in data:
        return bad_request('request must include asker_email field')
    asker_email = data['asker_email']
    if 'save_email' in data and data['save_email']:
        ask.asker_email = asker_email
        db.session.add(ask)
        db.session.commit()
    notifications.email_asker_remember_url(ask, asker_email)
    return 'success', 200


@app.route('/api/ask/<int:ask_id>/buyer-email', methods=['POST', 'PUT'])
def api_post_buyer_email(ask_id):
    """
    PUT/POST email for buyer
    """
    ask = Ask.query.get_or_404(ask_id)
    data = request.get_json() or {}
    if 'buyer_email' not in data:
        return bad_request('request must include buyer_email field')
    buyer_email = data['buyer_email']
    if 'save_email' in data and data['save_email']:
        ask.buyer_email = buyer_email
        db.session.add(ask)
        db.session.commit()
    notifications.email_buyer_remember_url(ask, buyer_email)
    return 'success', 200


@app.route('/api/ask/<int:ask_id>', methods=['GET'])
def api_get_ask(ask_id):
    """
    GET ask by id
    """
    return jsonify(Ask.query.get_or_404(ask_id).to_dict())


@app.route('/api/ask/<int:ask_id>/note', methods=['POST'])
def api_post_note(ask_id):
    """Adds a note to the notes list for the ask."""
    ask = Ask.query.get_or_404(ask_id)
    data = request.get_json() or {}
    if 'text' not in data or len(data['text']) < 1:
        return bad_request('data must include text in note field')
    note = Note(text=data['text'], ask=ask)
    if 'isOrderNumber' in data and data['isOrderNumber']:
        note.type = NoteTypes.ORDER_NUMBER
    elif 'isLockerCode' in data and data['isLockerCode']:
        note.type = NoteTypes.LOCKER_CODE
    db.session.add(note)
    db.session.commit()
    return jsonify(ask.to_dict())


# UPDATE ask
@app.route('/api/ask/<int:id>', methods=['UPDATE'])
def api_update_ask(id):
    return 'TODO: only allow if code present or basic user auth'


# DELETE ask
@app.route('/api/ask/<int:id>', methods=['DELETE'])
def api_delete_ask(id):
    return 'TODO: only allow if code present or basic user auth'


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    path_dir = os.path.abspath("./static")  # path react build
    return send_from_directory(path_dir, 'index.html')



def clear_data(session):
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print('Clear table %s' % table)
        session.execute(table.delete())
    session.commit()


@app.shell_context_processor
def make_shell_context():
    """
    Allows for flask shell interactions with database objects.
    $ flask shell
    """
    return {
        'db': db,
        'clear_data': clear_data,
        'Ask': Ask,
        'Note': Note,
        'NoteTypes': NoteTypes
    }
