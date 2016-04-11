from functools import wraps
from pprint import pprint

from flask import Blueprint, current_app, request
from flask_restful import Api, Resource, reqparse, abort

from models import User
from app import db
from app import Session

auth_api = Api(Blueprint('auth_api', __name__))

def requires_auth(f):
    @wraps(f)
    def decorated(self, *args, **kwargs):
        parser = reqparse.RequestParser()
        parser.add_argument('token', dest='token')
        parsed_args = parser.parse_args()
        print("form", parsed_args)
        token = parsed_args.token
        if not token:
            abort(401)
        user = User.verify_auth_token(token)
        if user == None:
            print("Incorrect token auth")
            return abort(401)
        return f(self, user, *args, **kwargs)
    return decorated

@auth_api.resource('/login')
class LoginAPI(Resource):

    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('username', dest='username')
        self.parser.add_argument('password', dest='password')

    #getting user id and password hash
    def post(self):
        args = self.parser.parse_args()
        print("login:", args)

        session = Session()
        user = session.query(User).filter_by(username = args.username).first()
        if user and user.check_password(args.password):
            #login_user(user)
            print("logged in user")
            token = user.generate_auth_token()
            #redirect to index
            return {
                'msg': "ok",
                'token': token.decode('ascii'),
                'route': "#/"
            }
        else:
            #self.email.errors.append("Invalid username or password")
            return {
                'msg': "Invalid username or password"
            }, 400


@auth_api.resource('/register')
class RegistrationAPI(Resource):

    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('username', dest='username')
        self.parser.add_argument('password', dest='password')

    #getting user id and password hash
    def post(self):
        args = self.parser.parse_args()
        print("register:", args)

        min_characters = 4
        if len(args.username) <= min_characters or len(args.password) <= min_characters:
            return {
                'msg': "Username and password must be greater than %s characters" % min_characters
            }, 400

        session = Session()
        user = session.query(User).filter_by(username = args.username).first()
        if user:
            #user already exists in db
            return {
                'msg': "Username already exists"
                #'route': "400" # no route since error code
            }, 400

        new_user = User(username=args.username)
        new_user.set_password(args.password)
        session.add(new_user)
        session.commit()
        # generate token after commit to get ID
        print(new_user.id)
        token = new_user.generate_auth_token()

        return {
            'msg': "ok",
            'token': token.decode('ascii'),
            'route': "#/"
        }

