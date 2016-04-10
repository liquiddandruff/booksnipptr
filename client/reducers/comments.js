import * as actionTypes from '../actionTypes/comments';

const DEFAULT_STATE = [];

const addComment = (state, action) => ([
  ...state,
  action.comment
]);

const requestComments = (state, action) => ([
  ...state,
  ...action.comments
]);

// const deleteSnippet = (state, action) => (
//   state.filter(snippet => snippet.id !== action.snippetId)
// );

const likeComment = function(state, action) {
  let newComments = [...state];
  newComments.find(comment => comment.id === action.commentId).likes++;
  return newComments;
};

export default function comments(state = DEFAULT_STATE, action) {
  return ({
    [actionTypes.ADD_COMMENT_SUCCESS]: addComment,
    [actionTypes.REQUEST_COMMENT_SUCCESS]: requestComments,
    [actionTypes.LIKE_COMMENT_SUCCESS]: likeComment
    // ,
    // [actionTypes.DELETE_COMMENT_SUCCESS]: deleteComment
  }[action.type] || (s => s))(state, action);
}
