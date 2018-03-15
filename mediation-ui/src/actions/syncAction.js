import {CALL_API} from '../constants/ActionTypes'
import apiConfig from '../config/api'

var makeApiMsg = function (requestWarp) {
  const {request,key} = requestWarp;
  if(!checkApiMsg(request.apiMsg,key)){
    return null;
  }
  if(typeof request.apiMsg === 'function'){
    request.apiMsg = invokeApiMsgFunc(requestWarp);
    if(!checkApiMsg(request.apiMsg,key)){
      return null;
    }
  }
  const type = request.type||key;
  return {
    [CALL_API]: Object.assign({},request.apiMsg,{type})
  };
};

var mergeStateAndActionMsg = function (getState,requestWarp) {
  const {request,actionMsg,otherMsg} = requestWarp;
  const mergeMsg = request.mergeMsg;
  let finalActionMsg = actionMsg;
  if(mergeMsg && typeof mergeMsg === 'function'){
    finalActionMsg = mergeMsg.apply(null,[getState(),actionMsg,...otherMsg]);
  }
  return finalActionMsg;
};

var makeSyncMsg = function (requestWarp) {
  return (dispatch, getState) => {
    const finalActionMsg = mergeStateAndActionMsg(getState,requestWarp);
    if(finalActionMsg==null){
      return null;
    }
    requestWarp.actionMsg = finalActionMsg;
    const apiMsg = makeApiMsg(requestWarp);
    if(apiMsg==null){
      return null;
    }
    return dispatch(Object.assign(apiMsg,finalActionMsg))
  }
};

var checkApiMsg = function (apiMsg,key) {
  const ret = apiMsg.endpoint==null && typeof apiMsg !== 'function';
  if(ret){
    console.error('apiMsg not have endpoint prop or not be a function api config '+key);
  }
  return !ret;
};

var invokeApiMsgFunc = function (requestWarp) {
  const {request,actionMsg, otherMsg} = requestWarp;
  return request.apiMsg.apply(null,[actionMsg,...otherMsg]);
};

var makeRequest = function(key){
  const config = apiConfig[key];
  if(config==null){
    console.error('can not found regist api config '+key);
    return null;
  }
  return Object.assign({},config.apiMsg == null ? {apiMsg:config}:config);
};

export function request(key, actionMsg,...otherMsg) {
  let request = makeRequest(key);
  if(request==null){
    return null;
  }
  actionMsg = actionMsg||{};
  return makeSyncMsg({request,key, actionMsg, otherMsg});
}
