import * as actionTypes from '../actionTypes/snippets';

const DEFAULT_STATE = [];

const addSnippet = (state, action) => ([
  ...state,
  action.snippet
]);

const requestSnippets = (state, action) => ([
  ...action.snippets
]);

const requestNewest = (state, action) => ([
  ...action.snippets
]);

const requestRecommended = (state, action) => ([
  ...action.snippets
]);

const requestHot = (state, action) => ([
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
    [actionTypes.DELETE_SNIPPET_SUCCESS]: deleteSnippet,
    [actionTypes.REQUEST_RECOMMENDED_SNIPPETS_SUCCESS]: requestRecommended,
    [actionTypes.REQUEST_HOT_SNIPPETS_SUCCESS]: requestHot,
    [actionTypes.REQUEST_NEWEST_SNIPPETS_SUCCESS]: requestNewest,
  }[action.type] || (s => s))(state, action);
}
