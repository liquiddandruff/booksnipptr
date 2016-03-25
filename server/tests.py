from app import db
from models import Tag, User, Post, Comment
from api import generateReccomendations
from datetime import datetime, timedelta

##############
#TEST HARNESS#
##############

#----------------------------
# Turn Foreign Key Constraints ON for
# each connection.
#----------------------------

from sqlalchemy.engine import Engine
from sqlalchemy import event

@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

#----------------------------
# Create the engine
#----------------------------

from sqlalchemy import create_engine
#set echo=True to see the SQL that's generated
engine = create_engine('sqlite:///:memory:', echo=False)

#----------------------------
# Create the Schema
#----------------------------

db.Model.metadata.create_all(engine)

#----------------------------
# Create the Session class 
#----------------------------

from sqlalchemy.orm import sessionmaker
Session = sessionmaker(bind=engine)

#----------------------------
# Populate the database 
#----------------------------

tag_cool = Tag(name='cool')
tag_car = Tag(name='car')
tag_animal = Tag(name='animal')

comment_rhino = Comment(text='Rhinoceros, often abbreviated as rhino, is a group of five extant species of odd-toed ungulates in the family Rhinocerotidae.')

post_car = Post(uuid='uuid_car', \
    tags=[tag_car, tag_cool], \
    created_at=(datetime.utcnow() - timedelta(days=1)))

post_another_car = Post(uuid='uuid_anothercar', \
    tags=[tag_car])

post_rhino = Post(uuid='uuid_rhino', \
    tags=[tag_animal], \
    comments=[comment_rhino])

user_joe = User(uuid='Joe blow from cokamoe', userID='Redudant copy of joe blow...', tags=[tag_car, tag_cool, tag_animal])

# Create a new Session and add the posts:
session = Session()

session.add(tag_cool)

session.add(tag_cool)
session.add(tag_car)
session.add(tag_animal)

session.add(comment_rhino)

session.add(post_car)
session.add(post_another_car)
session.add(post_rhino)

session.add(user_joe)

# Commit the changes:
session.commit()

#----------------------------
# Update a Record
#----------------------------

post_to_update = session.query(Post).filter(Post.uuid == 'uuid_rhino').first()
post_to_update.likes = post_to_update.likes + 1
session.commit()

#----------------------------
# Query the database
#
# List of common filter: 
#
#   *http://docs.sqlalchemy.org/en/rel_0_9/orm/tutorial.html#common-filter-operators
#
#----------------------------

print ("Here's what type of objec the database query returns: ")
print (type(session.query(User)))
print ("\n and the type of the tags list...")
#instrumentedList is SQLAlch version of list.
print (type(session.query(User).first().tags.pop()))

#Get all users and their liked tags
print ("Our users and their tags: ")
for user in session.query(User):
    print (user.tags)
    print (" ")

# Get all posts. For each post, add its tags to a list (python equiv of ArrayList/Vector)
print("Here come the tags for each post!\n")

postList = []
for post in session.query(Post):
    postList.append(post.tags)
print (postList) 


#Test reccomendation function
print ("glorious reccomendations:\n")
print (generateReccomendations(session.query(Post), session.query(User).first(), 2))

# Get a list of tags:

for name in session.query(Tag.name).order_by(Tag.name):
    print (name)

# How many tags do we have?
print("Here's the number of tags in the tag db:")
print(session.query(Tag).count())
print("Look up at the number of tags in the tag db \n\n\n\n\n\n")

# Get all posts created yesterday:
session.query(Post) \
    .filter(Post.created_at < datetime.utcnow().date()) \
    .all()

# Get all posts, that belong to the tag 'car' or 'animal', using a subselect:
session.query(Post) \
    .filter(Post.tags.any(Tag.name.in_(['car', 'animal']))) \
    .all()

# Get all posts. For each post, add to a list (python equiv of ArrayList/Vector)
print("Here come the tags for each post!\n")

postList = []
for post in session.query(Post):
    postList.append(post.tags)
print (postList)   

# This can also be expressed with a join:
session.query(Post) \
    .join(Tag, Post.tags) \
    .filter(Tag.name.in_(['car', 'animal'])) \
    .all()

# Play around with functions:
from sqlalchemy.sql import func, desc

max_date = session.query(func.max(Post.created_at))
session.query(Post).filter(Post.created_at == max_date).first()

# Get a list of tags with the number of posts:
q = session.query(Tag, func.count(Tag.name)) \
    .outerjoin(Post, Tag.posts) \
    .group_by(Tag.name) \
    .order_by(desc(func.count(Tag.name))) \
    .all()


for tag, count in q:
    print ('Tag "%s" has "%d" posts \n.' % (tag.name, count))


# Get posts created in the last two hours and zero likes so far:
session.query(Post) \
    .join(Tag, Post.tags) \
    .filter(Post.created_at > (datetime.utcnow() - timedelta(hours=2))) \
    .filter(Post.likes == 0) \
    .all()

