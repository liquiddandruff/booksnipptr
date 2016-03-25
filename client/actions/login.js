import * as actionTypes from '../actionTypes/login';
import { get, post, del } from '../utils/api';

export function loginUser(){
	return async dispatch => {
		dispatch({
			type: actionTypes.LOGIN_USER
		});

		try{
			const result = await post('/api/login');

			dispatch({
				type: actionTypes.LOGIN_USER_SUCCESS,
				login: result
			});
		}catch(e){
			dispatch({
				type: actionTypes.LOGIN_USER_ERROR
			});
		}
	}
}

