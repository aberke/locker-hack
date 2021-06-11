
import os

from datetime import datetime

import enum
# from geoalchemy2.types import Geometry
from sqlalchemy.orm import backref, relationship

from app import db



class Locker(db.Model):
    __tablename__ = 'locker'
    id = db.Column(db.Integer, primary_key=True)
    zipcode = db.Column(db.String, index=True) # can search by zipcode
    # lat, lng
    # geocoordinates = db.Column(Geometry(geometry_type='POINT', srid=4326))
    name = db.Column(db.String)
    address = db.Column(db.String)
    staffed = db.Column(db.Boolean)
    asks = db.relationship('Ask', backref='locker', lazy='dynamic')

# TODO: Tags
# Tag objects ← eg “family”, “food”, “skincare” to help search functionality
# Id (uuid)
# Name (str)


class AskStates(enum.Enum):
    OPEN = 'open'
    PURCHASED = 'purchased'
    DELIVERED = 'delivered'


class Ask(db.Model):
    __tablename__ = 'ask'
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    date_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    item_url = db.Column(db.String)
    item_name = db.Column(db.String)
    item_asin = db.Column(db.String)
    quantity = db.Column(db.Integer, default=1)
    price = db.Column(db.Float)
    code = db.Column(db.String(4), nullable=False)
    status = db.Column(db.Enum(AskStates), default=AskStates.OPEN)
    locker_id = db.Column(db.Integer, db.ForeignKey('locker.id'))
    notes = db.relationship('Note', backref='ask', lazy='dynamic') # dynamic to allow further query to sort notes
    # note: never return emails in API response
    asker_email = db.Column(db.String(120)) # optional to allow user to get notified
    buyer_email = db.Column(db.String(120)) # optional to allow user to get notified


class Note(db.Model):
    __tablename__ = 'note'
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, index=True, default=datetime.utcnow) # indexed to query by sorted order
    ask_id = db.Column(db.Integer, db.ForeignKey('ask.id'), nullable=False)
    text = db.Column(db.String(1400), nullable=False) # equivalent to 5 tweets
    is_order_number = db.Column(db.Boolean)
    is_locker_code = db.Column(db.Boolean)
