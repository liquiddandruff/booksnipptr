import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Default(object):
    DEBUG = False
    TESTING = False
    # TODO: set secret in env in production
    SECRET_KEY = '093e80e64f65b6a3ad29ea91040b962b48e1e9d820a5d857'
    SQLALCHEMY_TRACK_MODIFICATIONS = False # be quiet, sqlalchemy! (it will complain if this is not set)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
    DATABASE_URI = SQLALCHEMY_DATABASE_URI

class Production(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False # be quiet, sqlalchemy! (it will complain if this is not set)
    SECRET_KEY = '093e80e64f65b6a3ad29ea91040b962b48e1e9d820a5d857'
    #SQLALCHEMY_DATABASE_URI = 'postgresql:///' + os.path.join(basedir,'/ggbaker:password@localhost/booksnipptr')
    SQLALCHEMY_DATABASE_URI = 'postgresql://app_user:password@localhost/booksnipptr'
    SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
    DATABASE_URI = SQLALCHEMY_DATABASE_URI