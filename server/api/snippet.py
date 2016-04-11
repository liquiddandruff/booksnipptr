from flask import Blueprint, current_app
from flask_restful import Api, Resource, reqparse, abort
from models import Snippet, User, Tag

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
        self.parser.add_argument('sort', dest='sort')
        self.snippetParser = reqparse.RequestParser()

        self.snippetParser.add_argument('title', dest='title', location='snippet')
        self.snippetParser.add_argument('author', dest='author', location='snippet')
        self.snippetParser.add_argument('content', dest='content', required=True, location='snippet')
        self.snippetParser.add_argument('user_id', dest='user_id', location='snippet')
        self.snippetParser.add_argument('tags', dest='tags', location='snippet')

    def get(self):
        snippets = Snippet.query
        return [{
            'id': snippet.id,
            'title': snippet.title,
            'author': snippet.author,
            'content': snippet.content,
            'likes': snippet.likes,
            'created_at': snippet.created_at.isoformat() + 'Z',
            'tags': [tag.name for tag in snippet.tags],
            #'comments': snippet.comments
        } for snippet in snippets]

    @auth.requires_auth
    def post(self, user):
        root_args = self.parser.parse_args()
        snippet_args = self.snippetParser.parse_args(req=root_args)

        #print("New snippet:", snippet_args, snippet_args.title)
        #print("tags: ", snippet_args.tags.split(','))
        new_tag=snippet_args.tags.split(',')

        session = Session()
        snippet = Snippet(
            title=snippet_args.title,
            author=snippet_args.author,
            content=snippet_args.content,
            tags=[Tag(name=tagName) for tagName in new_tag]
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
            'created_at': snippet.created_at.isoformat() + 'Z',
            'tags': snippet_args.tags
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
        #print("Deleted snippet", snippet_id)
        return ("snippet %s deleted" % snippet_id), 200

    @auth.requires_auth
    def post(self, user):
        #, snippet_id, action
        args = self.parser.parse_args()
        #print("New delete:", args)

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
    def handleSnippetLike(snippet_id, user):
        session = Session()

        #increment snippet likes
        snippet_to_update = session.query(Snippet).filter_by(id=snippet_id).first()
        snippet_to_update.likes = snippet_to_update.likes + 1
        session.add(snippet_to_update)

        #print("Updated likes for", snippet_to_update)

        #associate user that liked snippet with the snippet's attributes

        #print('id:', user.id)
        #print("about to print temp snippet")
        tempSnippetTags = snippet_to_update.tags[:]
        #print(tempSnippetTags, '\n')

        user_to_update = session.query(User).filter_by(id = user.id).first()
        #print(user_to_update)
        #print('before', user_to_update.tags, '\n')
        for stag in tempSnippetTags:
            for utag in user_to_update.tags:
                if stag == utag:
                    tempSnippetTags.remove(stag)
                    break
        
        user_to_update.tags.extend(tempSnippetTags) 
        #print('after', user_to_update.tags, '\n')


        session.add(user_to_update)
        #commit changes
        session.commit()

    @auth.requires_auth
    def post(self, user):
        #print(user)
        args = self.parser.parse_args()
        #print("New like:", args)
        if args.type == 'snippet':
            return self.handleSnippetLike(args.id, user)
        else:
            return 404


@snippet_api.resource('/recommended')
class GetRecommended(Resource):

    @auth.requires_auth
    def post(self, user):
        snippets = Snippet.query
        #print('uesr tags', user.tags)

        recList = []
        for snippet in snippets:
            for tag in snippet.tags:
                print('tags of this snippet', snippet, tag) 
                if tag in user.tags:
                    recList.append(snippet) 
                break

        ret = [{
            'id': rec.id,
            'title': rec.title,
            'author': rec.author,
            'content': rec.content,
            'likes': rec.likes,
            'created_at': rec.created_at.isoformat() + 'Z',
            'tags': [tag.name for tag in rec.tags],
            #'comments': snippet.comments
        } for rec in recList]
        return ret;

@snippet_api.resource('/hot')
class GetHot(Resource):

    @auth.requires_auth
    def post(self, user):
        snippets = Snippet.query

        hot = [{
            'id': snippet.id,
            'title': snippet.title,
            'author': snippet.author,
            'content': snippet.content,
            'likes': snippet.likes,
            'created_at': snippet.created_at.isoformat() + 'Z',
            'tags': [tag.name for tag in snippet.tags],
        } for snippet in snippets]

        hotList = sorted(hot, key = lambda k: k['likes'], reverse = True)
        # print "hotlist is\n"
        # print(hotList)
        # print "hotlist is type \n\n"
        # print(type(hotList))
        return hotList;

@snippet_api.resource('/newest')
class GetNewest(Resource):

    def get(self):
        snippets = Snippet.query
        newest = [{
            'id': snippet.id,
            'title': snippet.title,
            'author': snippet.author,
            'content': snippet.content,
            'likes': snippet.likes,
            'created_at': snippet.created_at.isoformat() + 'Z',
            'tags': [tag.name for tag in snippet.tags],
        } for snippet in snippets]

        newestList = sorted(newest, key= lambda d: d['created_at'], reverse = True)
        # print "newest List is "
        # print(newestList)
        return newestList
