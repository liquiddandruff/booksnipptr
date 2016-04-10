import os
from logging import StreamHandler
from sys import stdout
from contextlib import contextmanager

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

import config

db = SQLAlchemy()

def Session():
    return db.create_scoped_session();

# unused... http://docs.sqlalchemy.org/en/rel_1_0/orm/session_basics.html#session-faq-whentocreate
@contextmanager
def session_scope():
    session = db.create_scoped_session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.remove()

def create_app():
    #from api.kittens import kittens_api
    from api.snippet import snippet_api
    from api.auth import auth_api
    from api.comment import comment_api
    from views.index import index_view

    app = Flask(__name__)
    #app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
    app.config.from_object('config.Default')
    #app.config.from_object('config.Production')

    #app.register_blueprint(kittens_api.blueprint, url_prefix='/api')
    app.register_blueprint(snippet_api.blueprint, url_prefix='/api')
    app.register_blueprint(auth_api.blueprint, url_prefix='/api')
    app.register_blueprint(comment_api.blueprint, url_prefix='/api')
    app.register_blueprint(index_view)

    db.init_app(app)
    
    handler = StreamHandler(stdout)
    app.logger.addHandler(handler)
    return app
