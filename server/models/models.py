#todo: switch db from sqlite3 to postgres
#todo: discuss changing userID field to uuid field for consitency

from app import db

from datetime import datetime, timedelta
from sqlalchemy.orm import relationship, backref
from werkzeug import generate_password_hash, check_password_hash

#Our two mappings: tags <-> snippets and tags <-> users

tags_snippets = db.Table('tag_snippet', db.Model.metadata,
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id')),
    db.Column('snippet_id', db.Integer, db.ForeignKey('snippets.id'))
)

tags_users = db.Table('tag_user', db.Model.metadata,
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

class User(db.Model):

    __tablename__ = 'users'

    id          =   db.Column(db.Integer, primary_key=True)
    uuid        =   db.Column(db.String(36), unique=True, nullable=False)

    #from flask-tech-demo models.py
    #userID      =   db.Column(db.String(64), nullable=False) #replace with uuid for consistency?
    pwdhash     =   db.Column(db.String(54), nullable=True) 
    
    created_at  =   db.Column(db.DateTime, default=datetime.utcnow)
    snippets       =   relationship('Snippet', backref='user', lazy='dynamic')
    #this relationship indicates a many-many relationship between users and tags.
    #the `tags_users` association table is somehow used to enable this relationship
    tags        =   relationship('Tag', secondary=tags_users, 
                        backref = backref('users', lazy='dynamic'))
    #The following creates a many-one relationship between comments and users.
    #A user can have many comments, a comment can only have one user
    comments    =   relationship('Comment', backref='user', lazy='dynamic')

    def set_password(self, password):
        self.pwdhash = generate_password_hash(password)
   
    def check_password(self, password):
        return check_password_hash(self.pwdhash, password)

    def __repr__(self):
        str_created_at = self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        return "<Snippet (uuid='%s', created_at=%s)>" % (self.uuid, str_created_at)

class Snippet(db.Model):

    __tablename__ = 'snippets'

    id          =   db.Column(db.Integer, primary_key=True)
    user_id     =   db.Column(db.Integer, db.ForeignKey('users.id'))
    content     =   db.Column(db.String(1000), nullable=False)
    author      =   db.Column(db.String(100), nullable=True)
    title       =   db.Column(db.String(100), nullable=True)
    likes       =   db.Column(db.Integer, default=0)
    created_at  =   db.Column(db.DateTime, default=datetime.utcnow)
    tags        =   relationship('Tag', secondary=tags_snippets, 
                        backref = backref('snippets', lazy='dynamic'))
    comments    =   relationship('Comment', backref='snippets', lazy='dynamic')

    def __repr__(self):
        str_created_at = self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        return "<Snippet (id='%s', likes='%d', created_at='%s', tags='%s', title='%s')>" % (self.id, self.likes, str_created_at, self.tags, self.title)

class Tag(db.Model):

    __tablename__ = 'tags'

    id      =   db.Column(db.Integer, primary_key=True)
    name    =   db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return "<Tag (name='%s')>" % (self.name)

class Comment(db.Model):

    __tablename__ = 'comments'

    id          =   db.Column(db.Integer, primary_key=True)
    text        =   db.Column(db.String(2000))
    #need these foreign keys to enable the many-one relationships
    #Comments have with snippets and users.
    snippet_id     =   db.Column(db.Integer, db.ForeignKey('snippets.id'))
    user_id     =   db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return "<Comment (text='%s')>" % (self.text)

