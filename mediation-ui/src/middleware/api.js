import {CALL_API,DEV_REQ_HOST,API_SYNC_TYPE,TYPE_REQUEST,TYPE_SUCCESS,TYPE_FAILURE} from '../constants/ActionTypes'
import {SIGN_IN_URL} from '../constants/Constant'
import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import merge from 'lodash/merge'
import 'isomorphic-fetch'

const TIMEOUT_KEY = Symbol('Timeout Key');

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, option) {
  let url = endpoint;
  if (process.env.NODE_ENV !== 'production' && url.indexOf('http')!=0) {
    url = DEV_REQ_HOST+url;
  }
  // return $.post(endpoint);
  const lastOption = merge({
    credentials:'include',
    headers:{'X-Requested-With':'XMLHttpRequest'}
  },option);
  return fetch(url,lastOption)
    .then(response =>{
      if(endpoint != SIGN_IN_URL && response.url.endsWith(SIGN_IN_URL)){
        return Promise.reject(TIMEOUT_KEY);
      }
      return response.json().then(json => ({ json, response }))
    }).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      const camelizedJson = camelizeKeys(json);
      // return {users:json}
        if (schema) {
          return Object.assign({},normalize(camelizedJson, schema))
        }else {
          return camelizedJson
        }
    })
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI;
  const { schema, type, option } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.')
  // }
  // if (!Array.isArray(types) || types.length !== 3) {
  //   throw new Error('Expected an array of three action types.')
  // }
  // if (!types.every(type => typeof type === 'string')) {
  //   throw new Error('Expected action types to be strings.')
  // }
  if (typeof type !== 'string') {
    throw new Error('Expected action type to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction
  }

  // const [ requestType, successType, failureType ] = types;
  // next(actionWith({ type: requestType,[API_SYNC_TYPE]:TYPE_REQUEST}));
  next(actionWith({ type,[API_SYNC_TYPE]:TYPE_REQUEST}));

  return callApi(endpoint, schema, option).then(
    response => next(actionWith({
      response,
      // type: successType,
      type,
      [API_SYNC_TYPE]:TYPE_SUCCESS
    })),
    error => {
      if(TIMEOUT_KEY == error){
        store.getState().header={};
      }
      next(actionWith({
        // type: failureType,
        type,
        error: error.message || 'Something bad happened',
        [API_SYNC_TYPE]:TYPE_FAILURE
      }))
    }
  )
}
