import * as actionTypes from '../actionTypes/snippets';

const DEFAULT_STATE = [];

const addSnippet = (state, action) => ([
  ...state,
  action.snippet
]);

const requestSnippets = (state, action) => ([
  ...state,
  ...action.snippets
]);

const deleteSnippet = (state, action) => (
  state.filter(snippet => snippet.id !== action.snippetId)
);

const likeSnippet = function(state, action) {
  let newSnippets = [...state];
  newSnippets.find(snippet => snippet.id === action.snippetId).likes++;
  return newSnippets;
};

export default function snippets(state = DEFAULT_STATE, action) {
  return ({
    [actionTypes.ADD_SNIPPET_SUCCESS]: addSnippet,
    [actionTypes.REQUEST_SNIPPETS_SUCCESS]: requestSnippets,
    [actionTypes.LIKE_SNIPPET_SUCCESS]: likeSnippet,
    [actionTypes.DELETE_SNIPPET_SUCCESS]: deleteSnippet
  }[action.type] || (s => s))(state, action);
}
