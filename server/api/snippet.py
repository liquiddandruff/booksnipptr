from flask import Blueprint
from flask_restful import Api, Resource, reqparse, abort
from models import Snippet, User, Tag
from app import db
from app import Session

snippet_api = Api(Blueprint('snippet_api', __name__))

@snippet_api.resource('/snippet')
class SnippetAPI(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('title', dest='title')
        self.parser.add_argument('author', dest='author')
        self.parser.add_argument('content', dest='content', required=True)
        self.parser.add_argument('user_id', dest='user_id')
        self.parser.add_argument('tags', dest='tags')

    def get(self):
        snippets = Snippet.query
        return [{
            'id': snippet.id,
            'title': snippet.title,
            'content': snippet.content,
            'likes': snippet.likes,
            'created_at': snippet.created_at.isoformat() + 'Z',
            'tags': snippet.tags,
            #'comments': snippet.comments
        } for snippet in snippets]

    def post(self):
        args = self.parser.parse_args()
        print("New snippet:", args)

        session = Session()
        new_snippet = Snippet(content=args.content, title=args.title, tags = args.tags) #tags=args.tags
        #new_tag = Tag(name=args.tags)
        print(args.tags)
        session.add(new_snippet)
        #session.add(new_tag)
        session.commit()

        return {
            'id': new_snippet.id,
            'title': new_snippet.title,
            'content': new_snippet.content,
            #'user_id': new_snippet.user_id,
            'likes': new_snippet.likes,
            'created_at': new_snippet.created_at.isoformat() + 'Z',
            'tags': new_snippet.tags,
            #'comments': new_snippet.comments
        }



# @snippet_api.resource('/snippet/<int:snippet_id>')
# class SnippetAPI(Resource):
#     @staticmethod
#     def delete(snippet_id):
#         session = Session()
#         snippet = session.query(Snippet).get_or_404(snippet_id)
#         session.delete(snippet)
#         session.commit()
#         return None, 404

@snippet_api.resource('/snippet/<int:snippet_id>/<string:action>')
class SnippetLikeAPI(Resource):
    def handleLike(self, snippet_id):
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

    def post(self, snippet_id, action):
        if action == 'like':
            return self.handleLike(snippet_id)
        elif action == '':
            return 404

    def delete(self, snippet_id, action):
        # don't care about action
        session = Session()
        # TODO: get scoped_session.query to use BaseQuery to allow for get_or_404 etc
        snippet = session.query(Snippet).get(snippet_id)
        if(snippet == None):
            abort(404)
        session.delete(snippet)
        session.commit()
        print("Deleted snippet", snippet_id)
        return ("snippet %s deleted" % snippet_id), 200

