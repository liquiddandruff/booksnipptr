from flask import Blueprint, current_app
from flask_restful import Api, Resource, reqparse, abort
from models import Snippet, User

from app import config
from app import db
from app import Session
from api import auth

snippet_api = Api(Blueprint('snippet_api', __name__))

@snippet_api.resource('/snippet')
class SnippetAPI(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('snippet', dest='snippet', type=dict)

        self.snippetParser = reqparse.RequestParser()
        self.snippetParser.add_argument('title', dest='title', location='snippet')
        self.snippetParser.add_argument('author', dest='author', location='snippet')
        self.snippetParser.add_argument('content', dest='content', required=True, location='snippet')
        self.snippetParser.add_argument('user_id', dest='user_id', location='snippet')

    def get(self):
        snippets = Snippet.query
        return [{
            'id': snippet.id,
            'title': snippet.title,
            'author': snippet.author,
            'content': snippet.content,
            'likes': snippet.likes,
            'created_at': snippet.created_at.isoformat() + 'Z'
            #'tags': snippet.tags,
            #'comments': snippet.comments
        } for snippet in snippets]

    @auth.requires_auth
    def post(self):
        root_args = self.parser.parse_args()
        snippet_args = self.snippetParser.parse_args(req=root_args)
        print("New snippet:", snippet_args, snippet_args.title)

        session = Session()
        snippet = Snippet(
            title=snippet_args.title,
            author=snippet_args.author,
            content=snippet_args.content
        )
        session.add(snippet)
        session.commit()

        # this response is used by the react client to instantly construct the snippet
        return {
            'id': snippet.id,
            'title': snippet.title,
            'author': snippet.author,
            'content': snippet.content,
            #'user_id': snippet.user_id,
            'likes': snippet.likes,
            'created_at': snippet.created_at.isoformat() + 'Z'
            #'tags': snippet.tags,
            #'comments': snippet.comments
        }



@snippet_api.resource('/delete')
class DeleteAPI(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('type', dest='type')
        self.parser.add_argument('id', dest='id', required=True)

    @staticmethod
    def handleSnippetDelete(snippet_id):
        session = Session()
        # TODO: get scoped_session.query to use BaseQuery to allow for get_or_404 etc
        snippet = session.query(Snippet).get(snippet_id)
        if(snippet == None):
            abort(404)
        session.delete(snippet)
        session.commit()
        print("Deleted snippet", snippet_id)
        return ("snippet %s deleted" % snippet_id), 200

    @auth.requires_auth
    def post(self):
        #, snippet_id, action
        args = self.parser.parse_args()
        print("New delete:", args)

        if args.type == 'snippet':
            return self.handleSnippetDelete(args.id)
        else:
            return 404


@snippet_api.resource('/like')
class LikeAPI(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('type', dest='type')
        self.parser.add_argument('id', dest='id', required=True)

    @staticmethod
    def handleSnippetLike(snippet_id):
        session = Session()

        #increment snippet likes
        snippet_to_update = session.query(Snippet).filter_by(id=snippet_id).first()
        snippet_to_update.likes = snippet_to_update.likes + 1
        session.add(snippet_to_update)

        print("Updated likes for", snippet_to_update)

        #associate user that liked snippet with the snippet's attributes
        #user_to_update = session.query(User).filter(User.uuid == userID).first()
        #for stag in snippet_to_update.tags:
            #for utag in user_to_update.tags:
                #if stag == utag:
                    #break
                #elif utag == user_to_update.tags.pop():
                    ##stag not found in user_to_update.tags, append stag to user's tags
                    #user_to_update.tags.append(stag)

        #commit changes
        session.commit()

    @auth.requires_auth
    def post(self):
        args = self.parser.parse_args()
        print("New like:", args)
        if args.type == 'snippet':
            return self.handleSnippetLike(args.id)
        else:
            return 404


