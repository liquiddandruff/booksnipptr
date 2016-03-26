from models import Base, Tag, User, Post, Comment
from datetime import datetime, timedelta

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

post_lotr = Post(content = "It's a dangerous business, Frodo, going out your door.  \
    You step onto the road, and if you don't keep your feet, there's no knowing where   \
    you might be swept off to. - J.R.R. Tolkien, The Lord of the Rings",
    tags=[tag_fantasy, tag_classic_lit], \
    created_at=(datetime.utcnow() - timedelta(days=1)))

post_it = Post(content = "We all float down here! \
    - Stephen King, It", \
    tags=[tag_horror, tag_fantasy])

post_outlander = Post(content = "Don't be afraid. There's the two of us now. - Diana Gabaldon, Outlander", \
    tags=[tag_romance, tag_scifi])

post_ringWorld = Post(content = "The gods do not protect fools. Fools are protected by more capable fools. - Larry Niven, Ringworld",
    tags=[tag_scifi])

post_snowy = Post(content = "The woods are lovely, dark and deep,\nBut I have promises to keep,\nAnd miles to go before I sleep,\nAnd miles to go before I sleep.", 
    tags=[tag_classic-lit, tag_poetry])

post_mobydick = Post(content = "I know not all that may be coming, but be it what it will, I'll go to it laughing - Herman Melville, Moby Dick",
    tags=[tag_adventure_fic])

post_thegreatgatsby = Post(content = "So we beat on, boats aganist the current, borne back ceaselessly into the past. - F.Scott Fitzgerald, The Great Gatsby",
    tags=[novel])

post_thealchemist = Post(content = "It's the possibility of having a dream come true that makes life interesting. - Paulo Coelho, The Alchemist",
    tags=[adventure_fic])

post_hamlet = Post(content = "To be, or not to be: that is the question. - William Shakespeare, Hamlet",
    tags=[tragedy], [tag_classic_lit])

post_tokillamockingbird = Post(content = "People generally see what they look for, and hear what they listen for. - Harper Lee, To Kill A Mockingbird",
    tags=[novel])

post_andthentherewerenone = Post(content = "In the midst of life, we are in death. - Agatha Christie, And Then There Were None",
    tags=[crime])

user_zhilinz = User(uuid="Zhilinz", tags=[tag_scifi, tag_fantasy, tag_horror])

user_ggbaker = User(uuid="Ggbaker", tags=[tag_novel, tag_romance])