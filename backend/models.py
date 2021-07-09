
import os

from datetime import datetime

import enum
from geoalchemy2 import Geometry
# from geoalchemy2.types import Geometry
from sqlalchemy.orm import backref, relationship

from app import db


# TODO: Tags
# Tag objects ← eg “family”, “food”, “skincare” to help search functionality
# Id (uuid)
# Name (str)


class AskStates(enum.Enum):
    OPEN = 'open'
    PURCHASED = 'purchased'
    DELIVERED = 'delivered'

    def __repr__(self):
        return "<%s>" % self.value


class Ask(db.Model):
    __tablename__ = 'ask'
    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    item_url = db.Column(db.String)
    item_name = db.Column(db.String)
    item_asin = db.Column(db.String)
    quantity = db.Column(db.Integer, default=1)
    price = db.Column(db.Float)
    code = db.Column(db.String(4), nullable=False)
    status = db.Column(db.Enum(AskStates), default=AskStates.OPEN)
    locker_place_id = db.Column(db.String, nullable=False)
    notes = db.relationship('Note', backref='ask', lazy='dynamic') # dynamic to allow further query to sort notes
    # note: never return emails in API response
    asker_email = db.Column(db.String(120)) # optional to allow user to get notified
    buyer_email = db.Column(db.String(120)) # optional to allow user to get notified

    def to_dict(self, include_email=False):
        public_attrs = [
            'id', 'updated', 'created', 'locker_place_id',
            'quantity', 'item_name', 'price', 'item_asin', 'item_url', 
            'code', # hide/handle on client side?
        ]
        data = { at: getattr(self, at) for at in public_attrs }
        data['status'] = self.status.value
        if include_email:
            data['asker_email'] = self.asker_email
            data['buyer_email'] = self.buyer_email
        # attach notes in order of addition
        data['notes'] = [n.to_dict() for n in self.notes.order_by(Note.created.asc()).all()]
        return data


class Note(db.Model):
    __tablename__ = 'note'
    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, index=True, default=datetime.utcnow) # indexed to query by sorted order
    ask_id = db.Column(db.Integer, db.ForeignKey('ask.id'), nullable=False)
    text = db.Column(db.String(1400), nullable=False) # equivalent to 5 tweets
    is_order_number = db.Column(db.Boolean)
    is_locker_code = db.Column(db.Boolean)

    def to_dict(self):
        keys = ['is_order_number', 'ask_id', 'id', 'created', 'text', 'is_locker_code']
        return { k: getattr(self, k) for k in keys }
