import React from 'react';
import Comment from './Comment';
import NewComment from './NewComment';
import useSheet from 'react-jss';
import { connect } from 'react-redux';
import { addKitten, deleteKitten } from '../actions/kittens';
//don't forget to add delete comment function
import { likeComment } from '../actions/comments';

import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

const Comments = ({ sheet, comments, snippetID }) =>

  <div className={sheet.classes.kittens}>
    {!!comments.length &&
      <div className={sheet.classes.basket}>
        {comments.map(function(comment) {
            console.log(comment)
            if (comment.snippet_id == snippetID){
              return <Comment key={`comment-${comment.id}`}
                      comment={comment}
                      onCommentLike={likeComment} />
            }
          }
        )}

      </div>
    }
    <div className={sheet.classes.paper}>
      <NewComment snippetID={snippetID}/>
    </div>
  </div>;

const STYLES = {
  credits: {
    fontSize: 10
  },

  link: {
    textDecoration: 'none'
  },

  basket: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexWrap: 'wrap'
  },

  kittens: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%'
  },

  paper: {
    width: '100%',
    margin: 0,
    textAlign: 'center',
    display: 'inline-block',
  }

};

export default connect(
  state => ({ comments: state.comments }),
  {  }
)(
  useSheet(Comments, STYLES)
);

// comments: [{'id': 1, 'text': 'can'}, {'id': 2, 'text': 'fcan'}]