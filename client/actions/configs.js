import * as actionTypes from '../actionTypes/configs';

export function requestConfigs() {
  return {
    type: actionTypes.REQUEST_CONFIGS
  }
}

export function putConfigs(configs) {
  return {
    type: actionTypes.PUT_CONFIGS,
    configs
  }
}


