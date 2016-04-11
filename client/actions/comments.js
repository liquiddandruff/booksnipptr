import * as actionTypes from '../actionTypes/comments';
import { get, post } from '../utils/api';

export function addComment(comment) {
  return async dispatch => {
    dispatch({
      type: actionTypes.ADD_COMMENT,
      comment
    });

    try {
      const result = await post('/api/comment', comment);

      dispatch({
        type: actionTypes.ADD_COMMENT_SUCCESS,
        comment: result
      });
    } catch(e) {
      dispatch({
        type: actionTypes.ADD_COMMENT_ERROR
      });
    }
  }
}

export function requestComments() {
  return async dispatch => {
    dispatch({
      type: actionTypes.REQUEST_COMMENTS
    });

    try {
      const result = await get('/api/comment');

      dispatch({
        type: actionTypes.REQUEST_COMMENTS_SUCCESS,
        comments: result
      });
    } catch(e) {
      dispatch({
        type: actionTypes.REQUEST_COMMENTS_ERROR
      });
    }
  }
}

export function likeComment(commentId) {
  return async dispatch => {
    dispatch({
      type: actionTypes.LIKE_COMMENT,
      commentId
    });

    try {
      // ES6 backtick strings for inline variable subtitution
      await post(`/api/comment/${commentId}/like`);

      dispatch({
        type: actionTypes.LIKE_COMMENT_SUCCESS,
        commentId
      });
    } catch(e) {
      dispatch({
        type: actionTypes.LIKE_COMMENT_ERROR,
        commentId
      });
    }
  }
}

// export function deleteSnippet(commentId) {
//   return async dispatch => {
//     dispatch({
//       type: actionTypes.DELETE_COMMENT,
//       commentId
//     });

//     try {
//       await del(`/api/comment/${commentId}/delete`);

//       dispatch({
//         type: actionTypes.DELETE_COMMENT_SUCCESS,
//         commentId
//       });
//     } catch(e) {
//       dispatch({
//         type: actionTypes.DELETE_COMMENT_ERROR,
//         commentId
//       });
//     }
//   }
// }
