from models import User, Snippet, Tag

##############
#REC FUNCTION#
##############
#This isn't C! The following prints 1, 2 because y isn't a pointer to x but a copy of x.
#It's safe to mess with postTagList because it's a copy, not the original.
#x = 1
#y = x
#y = y + 1

#print (x, y)

#Keep the tags as lists rather than converting to hashtables for constant lookup. post lists will always be fairly small,
#so scanning through them is basically constant time. User tag list doesn't need to be searched, we need to iterate through
#all elements so it makes sense to keep it a list

#possible improvement: do a shallow copy when this function is called (recFunct(posts[:]...). Save making a copy postTagList
def generateReccomendations(snippets, user, numRecsToReturn):
    if numRecsToReturn > snippets.count():
        numRecToReturn = snippets.count()
    
    recList = []
    for index in range (0, numRecsToReturn):
        recList.append([Snippet(), 0])
    
    for snippet in snippets:
        userSnippetSimilarityRating = 0;
        snippetTagList = snippet.tags
        for utag in user.tags:
            for ptag in snippetTagList:
                if ptag == utag:
                    userSnippetSimilarityRating+= 1
                    #Don't rescan matched next iteration
                    postTagList.remove(ptag)

        # Check if this post should be included as a reccomendation, replace if neccesary
        for rec in recList:
            if rec[1] < userSnippetSimilarityRating:
                rec[0] = snippet
                rec[1] = userSnippetSimilarityRating
                break

    return recList
