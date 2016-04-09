from flask import Blueprint
from flask.ext.login import LoginManager, login_user, logout_user,\
   current_user
from flask_restful import Api, Resource, reqparse, abort
from models import User
from app import db
from app import Session
from app import lm

auth_api = Api(Blueprint('auth_api', __name__))

@lm.user_loader
def load_user(id):
    return Session().User.query.get(int(id))


@auth_api.resource('/login')
class LoginAPI(Resource):

    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('uuid', dest='uuid')
        self.parser.add_argument('user_pwd', dest='user_pwd')

    #getting user id and password hash
    def post(self):
        print("backend post")

    def get(self):
        args = self.parser.parse_args()
	
        session = Session()
        user = session.query(User).filter_by(uuid = args.uuid).first()
        print("backend get")
    	if user and user.check_password(args.user_pwd):
    	    login_user(user)
            print("logged in user")
    	    #redirect to index
            return {
                'route': "#/"
            }
    	else:
    	    #self.email.errors.append("Invalid username or password")
    	    return {
    		#404.1= invalid credientials
    		'error': "404.1"
            }


@auth_api.resource('/register')
class RegistrationAPI(Resource):

    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('uuid', dest='uuid')
        self.parser.add_argument('user_pwd', dest='user_pwd')

    #getting user id and password hash
    def get(self):
        print("register get")

    def post(self):
        args = self.parser.parse_args()
	
        session = Session()
       
        user = session.query(User).filter_by(uuid = args.uuid).first()

        print("register post")

    	if user:
    	    #user already exists in db
    	    return {	
    		#error code correct?
                    'route': "400"
           	}
    	#Out of the if statement	
     	newuser = User(args.uuid, args.user_pwd)
        session.add(newuser)
        session.commit()
        login_user(newuser)  
      
    	if user and user.check_password(args.user_pwd):
    	    login_user(user, True)
                #redirect to index
    	    return {
                	'route': "#/"
           	}
    	else:
    	    #self.email.errors.append("Invalid username or password")
    	    return {
    	        #404.1= invalid credientials
    	        'error': "404.1"
           	}


