import * as actionTypes from '../actionTypes/auth';
import { get, post, del } from '../utils/api';

export function loginUser(formData) {
  // TODO: do stuff like assure formData has fields username, password, eg for below api post
  return async dispatch => {
    dispatch({
      type: actionTypes.LOGIN_USER
    });

    try {
      const result = await post('/api/login', formData);
      //create an action (actions change the state tree) and
      //send it off to the state tree
      dispatch({
        //we've defined all our action types in the actionTypes directory
        //each action has a type and the data describing the action (in this
        //case the result of the post request to the login backend)
        type: actionTypes.LOGIN_USER_SUCCESS,
        result: result

      });

    } catch(e) {
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR
        //no data in this action except for the type (no need for anything else)
      });
    }
  }
}

export function registerUser(formData) {
  // same as above TODO: {username, password, email}
  return async dispatch => {
    dispatch({
      type: actionTypes.REGISTER_USER
    });

    try {
      const result = await post('/api/register', formData);

      dispatch({
        type: actionTypes.REGISTER_USER_SUCCESS,
        result: result
      });
    } catch(e) {
      dispatch({
        type: actionTypes.REGISTER_USER_ERROR
      });
    }
  }
}
