"""
notifications.py

Handles sending notifications (e.g. emails) to askers and buyers.
"""

# from flask_mail import Mail
import util


def email_asker_remember_url(ask, asker_email):
	"""
	Emails the ASKer the url for the ask they created.
	This is the first email they receive for the ask.
	"""
	ask_url = util.get_ask_url_with_code(ask)
	print('TODO: email ask url %s to asker email %s, etc' % (ask_url, asker_email))


def email_buyer_remember_url(ask, buyer_email):
	"""
	Emails the BUYer the url for the ask they bought something for.
	This is the first email they receive for the ask.
	"""
	ask_url = util.get_ask_url_with_code(ask)
	print('TODO: email ask url %s to buyer email %s, etc' % (ask_url, buyer_email))
