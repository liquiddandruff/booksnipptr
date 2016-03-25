import { combineReducers } from 'redux';
import kittens from './kittens';
import snippets from './snippets';

const reducers = combineReducers({
  kittens,
  snippets
});

export default reducers;
