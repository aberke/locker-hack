"""
Utility functions for the backend.
"""

from flask import url_for


def get_ask_url_with_code(ask):
	return url_for('api_get_ask', id=ask.id) + '?code=' + ask.code