from datetime import datetime, timedelta

from app import db, create_app
from models import Tag, User, Snippet, Comment

app = create_app()

with app.app_context():
    db.create_all()

    tag_scifi = Tag(name='scifi')
    tag_fantasy = Tag(name='fantasy')
    tag_romance = Tag(name='romance')
    tag_poetry = Tag(name='poetry')
    tag_horror = Tag(name='horror')
    tag_classic_lit = Tag(name='classic-lit')
    tag_adventure_fic = Tag(name='adventure-fic')
    tag_novel = Tag(name='novel')
    tag_tragedy = Tag(name='tragedy')
    tag_crime = Tag(name='crime')

    db.session.add(tag_tragedy)
    db.session.add(tag_novel)
    db.session.add(tag_adventure_fic)
    db.session.add(tag_classic_lit)
    db.session.add(tag_horror)
    db.session.add(tag_poetry)
    db.session.add(tag_romance)
    db.session.add(tag_fantasy)
    db.session.add(tag_scifi)
    db.session.add(tag_crime)
    #vim macro buffer yiwodb.session.add()Pdd}p``

    snippet_lotr = Snippet(title="Lord of the Rings", author="J.R.R. Tolkien",
                           content = "It's a dangerous business, Frodo, going out your door.\
                                      You step onto the road, and if you don't keep your feet, there's no knowing where \
                                      you might be swept off to.",
                           tags=[tag_fantasy, tag_classic_lit], \
                           created_at=(datetime.utcnow() - timedelta(days=1)))
    db.session.add(snippet_lotr)

    snippet_ringWorld = Snippet(title="Ringworld", author="Larry Niven",
                                content = "The gods do not protect fools. Fools are protected by more capable fools.",
                                tags=[tag_scifi])
    db.session.add(snippet_ringWorld)

    snippet_outlander = Snippet(title="Outlander", author="Diana Gabaldon", 
                                content = "Don't be afraid. There's the two of us now.",
                                tags=[tag_romance, tag_scifi])
    db.session.add(snippet_outlander)

    user_zhilinz = User(username="Zhilinz", tags=[tag_scifi, tag_fantasy, tag_horror])
    db.session.add(user_zhilinz)

    user_ggbaker = User(username="Ggbaker", tags=[tag_novel, tag_romance])
    db.session.add(user_ggbaker)

    db.session.commit()

