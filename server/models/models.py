#todo: switch db from sqlite3 to postgres
#todo: discuss changing userID field to uuid field for consitency

from app import db

from datetime import datetime, timedelta
from sqlalchemy import Table, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from werkzeug import generate_password_hash, check_password_hash

#Our two mappings: tags <-> posts and tags <-> users

tags_posts = Table('tag_post', db.Model.metadata,
    Column('tag_id', Integer, ForeignKey('tags.id')),
    Column('post_id', Integer, ForeignKey('posts.id'))
)


tags_users = Table('tag_user', db.Model.metadata,
    Column('tag_id', Integer, ForeignKey('tags.id')),
    Column('user_id', Integer, ForeignKey('users.id'))
)

class User(db.Model):

    __tablename__ = 'users'

    id          =   Column(Integer, primary_key=True)
    uuid        =   Column(String(36), unique=True, nullable=False)

    #from flask-tech-demo models.py
    #userID      =   Column(String(64), nullable=False) #replace with uuid for consistency?
    pwdhash     =   Column(String(54), nullable=True) 
    
    created_at  =   Column(DateTime, default=datetime.utcnow)
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
        return "<Post (uuid='%s', created_at=%s)>" % (self.uuid, str_created_at)

class Post(db.Model):

    __tablename__ = 'posts'

    id          =   Column(Integer, primary_key=True)
    user_id     =   Column(Integer, ForeignKey('users.id'))
    content     =   Column(String(1000), nullable=False)
    author      =   Column(String(100), nullable=True)
    title       =   Column(String(100), nullable=True)
    likes       =   Column(Integer, default=0)
    created_at  =   Column(DateTime, default=datetime.utcnow)
    tags        =   relationship('Tag', secondary=tags_posts, 
                        backref = backref('snippets', lazy='dynamic'))
    comments    =   relationship('Comment', backref='snippet', lazy='dynamic')

    def __repr__(self):
        str_created_at = self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        return "<Post (id='%s', likes='%d', created_at=%s)>" % (self.id, self.likes, str_created_at)

class Tag(db.Model):

    __tablename__ = 'tags'

    id      =   Column(Integer, primary_key=True)
    name    =   Column(String(255), unique=True, nullable=False)

    def __repr__(self):
        return "<Tag (name='%s')>" % (self.name)

class Comment(db.Model):

    __tablename__ = 'comments'

    id          =   Column(Integer, primary_key=True)
    text        =   Column(String(2000))
    #need these foreign keys to enable the many-one relationships
    #Comments have with posts and users.
    snippet_id     =   Column(Integer, ForeignKey('snippets.id'))
    user_id     =   Column(Integer, ForeignKey('users.id'))

    def __repr__(self):
        return "<Comment (text='%s')>" % (self.text)

             
     



