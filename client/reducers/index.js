import { combineReducers } from 'redux';
import kittens from './kittens';
import snippets from './snippets';
import configs from './configs';

const reducers = combineReducers({
  kittens,
  snippets,
  auth,
  configs
});

export default reducers;
