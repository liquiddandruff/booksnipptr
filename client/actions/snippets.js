import * as actionTypes from '../actionTypes/snippets';
import { get, post, del } from '../utils/api';

export function addSnippet() {
  return async dispatch => {
    dispatch({
      type: actionTypes.ADD_SNIPPET
    });

    try {
      const result = await post('/api/snippets');

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
      const result = await get('/api/snippets');

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

export function deleteSnippet(snippetId) {
  return async dispatch => {
    dispatch({
      type: actionTypes.DELETE_SNIPPET,
      snippetId
    });

    try {
      await del(`/api/snippets/${snippetId}`);

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
