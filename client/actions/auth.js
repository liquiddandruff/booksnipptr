import * as actionTypes from '../actionTypes/auth';
import { get, post, del } from '../utils/api';

export function loginUser() {
  console.log("in login user")
  return async dispatch => {
    dispatch({
      type: actionTypes.LOGIN_USER
    });

    try {
      console.log("time to await get")
      const result = await get('/api/login');
      //create an action (actions change the state tree) and 
      //send it off to the state tree
      console.log("try block post returned")
      dispatch({
        //we've defined all our action types in the actionTypes directory
        //each action has a type and the data describing the action (in this
        //case the result of the post request to the login backend)
        type: actionTypes.LOGIN_USER_SUCCESS,
        login: result
        
      });

    } catch(e) {
      console.log("catch block fail")
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR
        //no data in this action except for the type (no need for anything else)
      });
    }
  }
}

export function registerUser() {
  console.log("in register user")
  return async dispatch => {
    dispatch({
      type: actionTypes.REGISTER_USER
    });
    
    try {
      console.log("In try block register")
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
