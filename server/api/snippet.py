from flask import Blueprint
from flask_restful import Api, Resource
from models import Post, User
from app import db

snippet_api = Api(Blueprint('snippet_api', __name__))

@snippet_api.resource('/snippet')
class SnippetAPI(Resource):
    @staticmethod
    def get():
        posts = Post.query
        return [{
            'uuid': post.uuid,
            'likes': post.likes,
            'created_at': post.created_at,
            'tags': post.tags,
            'comments': post.comments
        }for post in posts]

    @staticmethod
    def post():
        new_snippet = Post()
        db.session.add(new_snippet)
        db.session.commit()

        return {
            'id': new_snippet.id,
            'uuid': new_snippet.uuid,
            'user_id': new_snippet.user_id,
            'likes': new_snippet.likes,
            'created_at': new_snippet.created_at,
            'tags': new_snippet.tags,
            'comments': new_snippet.comments
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
    @staticmethod
    def recordLike(snippetID, userID):
        #increment snippet likes
        snippet_to_update = db.session.query(Post).filter(Post.uuid == snippetID).first()
        #store snippet likes in temp variable
        snippet_to_update_likes = snippet_to_update.likes
        snippet_to_update_likes = snippet_to_update_likes + 1

        #associate user that liked post with the post's attributes
        user_to_update = db.session.query(User).filter(User.uuid == userID).first()
        for stag in snippet_to_update.tags:
            for utag in user_to_update.tags:
                if stag == utag:
                    break
                elif utag == user_to_update.tags.pop():
                    #stag not found in user_to_update.tags, append stag to user's tags
                    user_to_update.tags.append(stag)

        #commit changes
        db.session.commit()
