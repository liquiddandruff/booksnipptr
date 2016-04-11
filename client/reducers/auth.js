import ld from 'lodash';
import * as actionTypes from '../actionTypes/auth';

const DEFAULT_STATE = [];


const loginSuccess = function(state, action) {
  let nextState = { ...state };
  console.log('login 1', action);
  nextState.token = action.result.token;
  nextState.logged_in = true;
  localStorage.setItem('auth', JSON.stringify(nextState));
  return nextState;
};

const loginError = function(state, action) {
  let nextState = { ...state };
  console.log('login 0:', action);
  nextState.logged_in = false;
  localStorage.setItem('auth', JSON.stringify(nextState));
  return nextState;
};

const registerSuccess = function(state, action) {
  let nextState = { ...state };
  console.log('register 1', action);
  nextState.token = action.result.token;
  nextState.logged_in = true;
  localStorage.setItem('auth', JSON.stringify(nextState));
  return nextState;
};

const registerError = function(state, action) {
  let nextState = { ...state };
  console.log('register 0', action);
  nextState.logged_in = false;
  localStorage.setItem('auth', JSON.stringify(nextState));
  return nextState;
};

const logoutUser = function(state, action) {
  let nextState = { ...state };
  console.log('register 0', action);
  nextState.logged_in = false;
  nextState.auth = '';
  localStorage.setItem('auth', JSON.stringify(nextState));
  return nextState;
};

const reloadFromLocalStorage = function(state, action) {
  let nextState = JSON.parse(localStorage.getItem('auth'));
  return nextState;
}

export default function auth(state = DEFAULT_STATE, action) {
  return ({
    [actionTypes.LOGIN_USER_SUCCESS]: loginSuccess,
    [actionTypes.LOGIN_USER_ERROR]: loginError,
    [actionTypes.REGISTER_USER_SUCCESS]: registerSuccess,
    [actionTypes.REGISTER_USER_ERROR]: registerError,
    [actionTypes.LOGOUT_USER]: logoutUser,
    [actionTypes.RELOAD_FROM_LOCAL_STORAGE]: reloadFromLocalStorage
  }[action.type] || (s => s))(state, action);
}
