#todo: switch db from sqlite3 to postgres
from datetime import datetime, timedelta

from sqlalchemy.orm import relationship, backref
from werkzeug import generate_password_hash, check_password_hash

from app import app
from app import db
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)

#Our two mappings: tags <-> snippets and tags <-> users

tags_snippets = db.Table('tag_snippet', db.Model.metadata,
                         db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
                         db.Column('snippet_id', db.Integer, db.ForeignKey('snippet.id'))
                         )

tags_users = db.Table('tag_user', db.Model.metadata,
                      db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
                      db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
                      )

class User(db.Model):

    id          =   db.Column(db.Integer, primary_key=True)

    username    =   db.Column(db.String(36), unique=True, nullable=False)
    pwdhash     =   db.Column(db.String(600), nullable=True)

    created_at  =   db.Column(db.DateTime, default=datetime.utcnow)
    snippets    =   relationship('Snippet', #secondary=snippets_users,
                                 backref='users', lazy='dynamic')
    #this relationship indicates a many-many relationship between users and tags.
    #the `tags_users` association table is somehow used to enable this relationship
    tags        =   relationship('Tag', secondary=tags_users,
                                 backref = backref('users', lazy='dynamic'))

    def set_password(self, password):
        self.pwdhash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.pwdhash, password)

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3

    def generate_auth_token(self, expiration = 600):
        s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
        dump =  s.dumps({ 'id': self.get_id() })
        print('dump', dump)
        recovered = s.loads(dump)
        print('recovered', recovered)
        return dump

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired
        except BadSignature:
            return None # invalid token
        print('data', data)
        user = User.query.get(data['id'])
        return user

    def __repr__(self):
        return '<User %r>' % (self.username)

class Snippet(db.Model):

    id          =   db.Column(db.Integer, primary_key=True)
    user_id     =   db.Column(db.Integer, db.ForeignKey('user.id'))
    content     =   db.Column(db.String(1000), nullable=False)
    author      =   db.Column(db.String(100), nullable=True)
    title       =   db.Column(db.String(100), nullable=True)
    likes       =   db.Column(db.Integer, default=0)
    created_at  =   db.Column(db.DateTime, default=datetime.utcnow)
    tags        =   relationship('Tag', secondary=tags_snippets,
                                 backref = backref('snippets', lazy='dynamic'))

    #The following creates a many-one relationship between comments and snippets.
    #A snippet can have many comments, a comment can only have one snippet
    comments    =   relationship('Comment', backref='snippets', lazy='dynamic')

    #def __init__():


    def __repr__(self):
        str_created_at = self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        return "<Snippet (id='%s', likes='%d', created_at='%s', tags='%s', title='%s')>" % (self.id, self.likes, str_created_at, self.tags, self.title)

class Tag(db.Model):

    id      =   db.Column(db.Integer, primary_key=True)
    #yolo
    #name    =   db.Column(db.String(255), unique=True, nullable=False)
    name    =   db.Column(db.String(255), nullable=False)

    def __str__(self):
        return self.name

    def __repr__(self):
        return "<Tag (name='%s')>" % (self.name)

class Comment(db.Model):

    id          =   db.Column(db.Integer, primary_key=True)
    text        =   db.Column(db.String(2000))
    created_at  =   db.Column(db.DateTime, default=datetime.utcnow)
    likes       =   db.Column(db.Integer, default=0)
    #need these foreign keys to enable the many-one relationships
    #Comments have with snippets and users.
    snippet_id     =   db.Column(db.Integer, db.ForeignKey('snippet.id'))
    username     =   db.Column(db.String, db.ForeignKey('user.username'))

    def __repr__(self):
        return "<Comment (text='%s')>" % (self.text)

