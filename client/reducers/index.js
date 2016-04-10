import { combineReducers } from 'redux';
import snippets from './snippets';
import configs from './configs';
import auth from './auth';

const reducers = combineReducers({
  snippets,
  configs,
  auth,
});

export default reducers;
