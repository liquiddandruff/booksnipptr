import ld from 'lodash';
import * as actionTypes from '../actionTypes/configs';

const DEFAULT_STATE = [];


const requestConfigs = function(state, action) {
  let prevState = { ...state };
  return prevState;
};

const putConfigs = function(state, action) {
  let prevConfigsState = { ...state };
  ld.merge(prevConfigsState, action.configs);
  return prevConfigsState;
};

export default function configs(state = DEFAULT_STATE, action) {
  return ({
    [actionTypes.REQUEST_CONFIGS]: requestConfigs,
    [actionTypes.PUT_CONFIGS]: putConfigs
  }[action.type] || (s => s))(state, action);
}

