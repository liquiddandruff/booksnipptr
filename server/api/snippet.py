from flask import Blueprint
from flask_restful import Api, Resource, reqparse, abort
from models import Post, User
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

    def get(self):
        posts = Post.query
        return [{
            'id': post.id,
            'content': post.content,
            'likes': post.likes,
            'created_at': post.created_at.isoformat() + 'Z'
            #'tags': post.tags,
            #'comments': post.comments
        } for post in posts]

    def post(self):
        args = self.parser.parse_args()
        print("New snippet:", args, args.author)

        session = Session()
        new_snippet = Post(content=args.content)
        session.add(new_snippet)
        session.commit()

        return {
            'id': new_snippet.id,
            'content': new_snippet.content,
            #'user_id': new_snippet.user_id,
            'likes': new_snippet.likes,
            'created_at': new_snippet.created_at.isoformat() + 'Z'
            #'tags': new_snippet.tags,
            #'comments': new_snippet.comments
        }



# @snippet_api.resource('/snippet/<int:snippet_id>')
# class SnippetAPI(Resource):
#     @staticmethod
#     def delete(snippet_id):
#         session = Session()
#         snippet = session.query(Post).get_or_404(snippet_id)
#         session.delete(snippet)
#         session.commit()
#         return None, 404

@snippet_api.resource('/snippet/<int:snippet_id>/<string:action>')
class SnippetLikeAPI(Resource):
    def handleLike(self, snippet_id):
        session = Session()

        #increment snippet likes
        snippet_to_update = session.query(Post).filter_by(id=snippet_id).first()
        snippet_to_update.likes = snippet_to_update.likes + 1
        session.add(snippet_to_update)

        print("Updated likes for", snippet_to_update)

        #associate user that liked post with the post's attributes
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
        snippet = session.query(Post).get(snippet_id)
        if(snippet == None):
            abort(404)
        session.delete(snippet)
        session.commit()
        print("Deleted snippet", snippet_id)
        return ("snippet %s deleted" % snippet_id), 200

