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

const Comments = ({ sheet, comments, likeComment }) =>
  {console.log(this.snippetID)}
  <div className={sheet.classes.kittens}>
    <Paper className={sheet.classes.paper}>
      <NewComment />
    </Paper>
    {!!comments.length &&
      <div className={sheet.classes.basket}>
        {comments.map(comment => (
          <Comment key={`comment-${comment.id}`}
                  comment={comment}
                  onCommentLike={likeComment} />
        ))}
      </div>
    }
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
  state => ({ kittens: state.kittens, comments: state.comments }),
  { addKitten, deleteKitten, addComment, likeComment } //add deleteComment
)(
  useSheet(Comments, STYLES)
);
