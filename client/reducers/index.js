import { combineReducers } from 'redux';
import snippets from './snippets';
import configs from './configs';
import auth from './auth';
import comments from './comments';

const reducers = combineReducers({
  snippets,
  configs,
  auth,
  comments,
});

export default reducers;
