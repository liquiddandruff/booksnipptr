from flask import Blueprint
from flask_restful import Api, Resource, reqparse, abort
from models import User
from app import db
from app import Session

auth_api = Api(Blueprint('auth_api', __name__))

def load_user(id):
    return Session().User.query.get(int(id))


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
            #redirect to index
            return {
                'msg': "ok",
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

        session = Session()
        user = session.query(User).filter_by(username = args.username).first()
        if user:
            #user already exists in db
            return {
                'msg': "Username already exists"
                #'route': "400" # no route since error code
            }, 400
        #Out of the if statement
        newuser = User(username=args.username)
        newuser.set_password(args.password)
        session.add(newuser)
        session.commit()
        #login_user(newuser)

        return {
            'msg': "ok",
            'route': "#/"
        }

