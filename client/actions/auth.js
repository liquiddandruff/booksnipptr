import * as actionTypes from '../actionTypes/auth';
import { putConfigs } from './configs';
import { get, post, del } from '../utils/api';

export function loginUser(formData) {
  // TODO: do stuff like assure formData has fields username, password, eg for below api post
  return async dispatch => {
    dispatch({
      type: actionTypes.LOGIN_USER
    });

    let result = null;
    try {
      result = await post('/api/login', formData);
      let auth = {
        token: result.token,
        username: formData.username
      };
      //create an action (actions change the state tree) and
      //send it off to the state tree
      dispatch({
        //we've defined all our action types in the actionTypes directory
        //each action has a type and the data describing the action (in this
        //case the result of the post request to the login backend)
        type: actionTypes.LOGIN_USER_SUCCESS,
        result: auth

      });

    } catch(e) {
      // unwrap promise to get result like above
      e.response.then(result => {
        dispatch(putConfigs({
          snackbarOpen: true,
          snackbarMsg: result.msg
        }));
      });
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR,
        result: result
      });
    }
  }
}

export function logoutUser() {
  return async dispatch => {
    dispatch({
      type: actionTypes.LOGOUT_USER
    });
  }
}
export function reloadFromLocalStorage() {
  return async dispatch => {
    dispatch({
      type: actionTypes.RELOAD_FROM_LOCAL_STORAGE
    });
  }
}

export function registerUser(formData) {
  // same as above TODO: {username, password, email}
  return async dispatch => {
    dispatch({
      type: actionTypes.REGISTER_USER
    });

    let result = null;
    try {
      result = await post('/api/register', formData);
      let auth = {
        token: result.token,
        username: formData.username
      };

      dispatch({
        type: actionTypes.REGISTER_USER_SUCCESS,
        result: auth
      });
    } catch(e) {
      // unwrap promise to get result like above
      e.response.then(result => {
        dispatch(putConfigs({
          snackbarOpen: true,
          snackbarMsg: result.msg
        }));
      });
      dispatch({
        type: actionTypes.REGISTER_USER_ERROR,
        result: result
      });
    }
  }
}
