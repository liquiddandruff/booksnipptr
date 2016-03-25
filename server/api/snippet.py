from flask import Blueprint
from flask_restful import Api, Resource
from models import models

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
		from app import db
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

# @snippet_api.resource('/snippet/<int:snippet_id')
# class SnippetAPI(Resource):
# 	@staticmethod
# 	def delete(snippet_id):
# 		from app import db
# 		snippet = Post.query.get_or_404(snippet_id)
# 		db.session.delete(snippet)
# 		db.session.commit()

# 		return None, 404
