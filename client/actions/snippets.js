import * as actionTypes from '../actionTypes/snippets';
import { get, post, del } from '../utils/api';

export function addSnippet(snippet) {
<<<<<<< HEAD
  console.log('addSnippet', snippet, snippet.title, snippet.author, snippet.content, snippet.tags);
  return async dispatch => {
=======
  console.log('addSnippet', snippet, snippet.title, snippet.author, snippet.content);
  return async (dispatch, getState) => {
    const { auth } = getState();
>>>>>>> 2a1147adbe96e611de3383ae9fbb48a8932e967d
    dispatch({
      type: actionTypes.ADD_SNIPPET,
      snippet
    });

    try {
      const json = {
        snippet,
        token: auth.token
      }
      const result = await post('/api/snippet', json);

      dispatch({
        type: actionTypes.ADD_SNIPPET_SUCCESS,
        snippet: result
      });
    } catch(e) {
      dispatch({
        type: actionTypes.ADD_SNIPPET_ERROR
      });
    }
  }
}

export function requestSnippets() {
  return async dispatch => {
    dispatch({
      type: actionTypes.REQUEST_SNIPPETS
    });

    try {
      const result = await get('/api/snippet');

      dispatch({
        type: actionTypes.REQUEST_SNIPPETS_SUCCESS,
        snippets: result
      });
    } catch(e) {
      dispatch({
        type: actionTypes.REQUEST_SNIPPETS_ERROR
      });
    }
  }
}

export function likeSnippet(snippetId) {
  return async (dispatch, getState) => {
    const { auth } = getState();
    dispatch({
      type: actionTypes.LIKE_SNIPPET,
      snippetId
    });

    try {
      const json = {
        type: 'snippet',
        id: snippetId,
        token: auth.token
      }
      // ES6 backtick strings for inline variable subtitution
      //await post(`/api/snippet/${snippetId}/like`, json);
      await post('/api/like', json);

      dispatch({
        type: actionTypes.LIKE_SNIPPET_SUCCESS,
        snippetId
      });
    } catch(e) {
      dispatch({
        type: actionTypes.LIKE_SNIPPET_ERROR,
        snippetId
      });
    }
  }
}
export function deleteSnippet(snippetId) {
  return async (dispatch, getState) => {
    const { auth } = getState();
    dispatch({
      type: actionTypes.DELETE_SNIPPET,
      snippetId
    });

    try {
      const json = {
        type: 'snippet',
        id: snippetId,
        token: auth.token
      }
      await post('api/delete', json);

      dispatch({
        type: actionTypes.DELETE_SNIPPET_SUCCESS,
        snippetId
      });
    } catch(e) {
      dispatch({
        type: actionTypes.DELETE_SNIPPET_ERROR,
        snippetId
      });
    }
  }
}
