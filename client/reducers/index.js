import { combineReducers } from 'redux';
import kittens from './kittens';
import snippets from './snippets';
import configs from './configs';
import auth from './auth';

const reducers = combineReducers({
  kittens,
  snippets,
  configs,
  auth,
});

export default reducers;
