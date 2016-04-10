import { combineReducers } from 'redux';
import kittens from './kittens';
import snippets from './snippets';
import configs from './configs';
import auth from './auth';
import comments from './comments';

const reducers = combineReducers({
  kittens,
  snippets,
  configs,
  auth,
  comments,
});

export default reducers;
