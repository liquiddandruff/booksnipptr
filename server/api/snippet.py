from flask import Blueprint
from flask_restful import Api, Resource, reqparse, abort
from models import Snippet, User
from app import db
from app import Session

snippet_api = Api(Blueprint('snippet_api', __name__))

@snippet_api.resource('/snippet')
class SnippetAPI(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('author', dest='author')
        self.parser.add_argument('content', dest='content')

    def get(self):
        snippets = Snippet.query
        return [{
            'id': snippet.id,
            'content': snippet.content,
            'likes': snippet.likes,
            'created_at': snippet.created_at.isoformat() + 'Z'
            #'tags': post.tags,
            #'comments': post.comments
        } for snippet in snippets]

    def post(self):
        args = self.parser.parse_args()
        print("New snippet:", args, args.author)

        session = Session()
        new_snippet = Snippet(content=args.content)
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
#	@staticmethod
#	def delete(snippet_id):
#		from app import db
#		snippet = Post.query.get_or_404(snippet_id)
#		db.session.delete(snippet)
#		db.session.commit()

#		return None, 404

@snippet_api.resource('/snippet/<int:snippet_id>/like')
class SnippetLikeAPI(Resource):
    def post(self, snippet_id):
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
