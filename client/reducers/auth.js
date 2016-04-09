import ld from 'lodash';
import * as actionTypes from '../actionTypes/auth';

const DEFAULT_STATE = [];


const loginSuccess = function(state, action) {
  let prevState = { ...state };
  console.log('ay lmao success');
  return prevState;
};

const loginError = function(state, action) {
  let prevConfigsState = { ...state };
  console.log('ay lmao fail');
  return prevConfigsState;
};

export default function configs(state = DEFAULT_STATE, action) {
  return ({
    [actionTypes.LOGIN_USER_SUCCESS]: loginSuccess,
    [actionTypes.LOGIN_USER_ERROR]: loginError
  }[action.type] || (s => s))(state, action);
}
