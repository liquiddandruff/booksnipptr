from flask import Blueprint
from flask_restful import Api, Resource
from models import models
from app import Session

login_api = Api(Blueprint('login_api', __name__))

@login_api.resource('/login')
class LoginAPI(Resource):
	def get():
		