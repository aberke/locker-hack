
import os

import enum
from geoalchemy2 import func
from sqlalchemy import Column, DateTime, Integer, Boolean, String, ForeignKey, Index
from sqlalchemy.orm import backref, relationship
from sqlalchemy import create_engine
from shapely import geometry
from uuid import uuid4

from app import db



class Locker(db.Model):
    __tablename__ = 'lockers'
    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    name = db.Column(db.String)
    address = db.Column(db.String)
    active = db.Column(db.Boolean)
    staffed = db.Column(db.Boolean)


class AskStates(enum.Enum):
    OPEN = "open"
    PURCHASED = "purchased"
    DELIVERED = "delivered"


class Ask(db.Model):
    __tablename__ = 'asks'
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(DateTime, default=func.now())
    date_updated = db.Column(DateTime, onupdate=func.now())
    item_url = db.Column(db.String)
    item_name = db.Column(db.String)
    quantity = db.Column(db.Integer)
    price = db.Column(db.Float)
    code = db.Column(String(4))
    status = db.Column(db.Enum(AskStates))


class Note(db.Model):
    __tablename__ = "notes"
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(DateTime, default=func.now())
    ask_id = db.Column(db.Integer, ForeignKey(Ask.id))
    text = db.Column(db.String)
    is_locker_code = db.Column(db.Boolean)


# class User(db.Model):
#     __tablename__ = "users"
#     email = db.Column(String)
#     phone = db.Column(String)
#     asks = db.relationship('asks', backref=backref('user'))
