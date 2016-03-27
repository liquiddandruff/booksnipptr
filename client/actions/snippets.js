import * as actionTypes from '../actionTypes/snippets';
import { get, post, del } from '../utils/api';

export function addSnippet(snippet) {
  console.log("addSnippet", snippet, snippet.title, snippet.author, snippet.content);
  return async dispatch => {
    dispatch({
      type: actionTypes.ADD_SNIPPET,
      snippet
    });

    try {
      const result = await post('/api/snippet', snippet);

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
  return async dispatch => {
    dispatch({
      type: actionTypes.LIKE_SNIPPET,
      snippetId
    });

    try {
      await post(`/api/snippet/${snippetId}/like`);

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
  return async dispatch => {
    dispatch({
      type: actionTypes.DELETE_SNIPPET,
      snippetId
    });

    try {
      await del(`/api/snippet/${snippetId}/delete`);

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
