from models import Base, Tag, User, Post, Comment
from datetime import datetime, timedelta

tag_scifi = Tag(name='scifi')
tag_fantasy = Tag(name='fantasy')
tag_romance = Tag(name='romance')
tag_poetry = Tag(name='poetry')
tag_horror = Tag(name='horror')
tag_classic_lit = Tag(name='classic-lit')

post_lotr = Post(content = "It's a dangerous business, Frodo, going out your door.  \
You step onto the road, and if you don't keep your feet, there's no knowing where   \
you might be swept off to. - J.R.R. Tolkien, The Lord of the Rings",
    tags=[tag_fantasy], \
    created_at=(datetime.utcnow() - timedelta(days=1)))

post_it = Post(content = "We all float down here! \
- Stephen King, It", \
    tags=[tag_horror])

post_outlander = Post(content = "Don't be afraid. There's the two of us now.    \ 
- Diana Gabaldon, Outlander",
    tags=[tag_animal], \
    comments=[comment_rhino])

user_joe = User(uuid='Joe blow from cokamoe', tags=[tag_scifi, tag_fantasy, tag_horror])

