import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Default(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
    DATABASE_URI = 'sqlite://:memory:'
