import os
basedir = os.path.abspath(os.path.dirname(__file__)) # 'backend'

class Config(object):
	SECRET_KEY = "change me to random string in env variable"
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
		'sqlite:///' + os.path.join(basedir, 'app.db')
	SQLALCHEMY_TRACK_MODIFICATIONS = False
