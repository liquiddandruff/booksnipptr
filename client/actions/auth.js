import * as actionTypes from '../actionTypes/auth';
import { get, post, del } from '../utils/api';

export function loginUser() {
  return async dispatch => {
    dispatch({
      type: actionTypes.LOGIN_USER
    });

    try {
      const result = await post('/api/login');

      dispatch({
        type: actionTypes.LOGIN_USER_SUCCESS,
        login: result
      });
    } catch(e) {
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR
      });
    }
  }
}

export function registerUser() {
  return async dispatch => {
    dispatch({
      type: actionTypes.REGISTER_USER
    });

    try {
      const result = await post('/api/register');

      dispatch({
        type: actionTypes.REGISTER_USER_SUCCESS,
        register: result
      });
    }catch(e){
      dispatch({
        type:actionTypes.REGISTER_USER_ERROR
      });
    }
  }
}