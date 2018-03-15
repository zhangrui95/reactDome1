import {UPDATE_PASS,VALIDATE_PASS,LOAD_USER,SIGN_IN_USER,SIGN_OUT_USER,HEADER_RESET} from '../constants/ActionTypes'
import syncReducer from './syncReducer'
import storage from '../utils/storage'

const domainConfig = (domain) => {
  return {
    request: (state) => state,
    done: (state,action) => Object.assign({},state,{[domain]:{response:action.response}}),
    fail: (state,action) => Object.assign({},state,{[domain]:{error:action.error}})
  }
};

export default syncReducer({
  [UPDATE_PASS]:domainConfig('updatePass'),
  [VALIDATE_PASS]:domainConfig('validPass'),
  [LOAD_USER]:domainConfig('user'),
  [SIGN_IN_USER]:{
    done: (state,action) => Object.assign({},state,{user:{response:action.response}}),
    fail: (state,action) => Object.assign({},state,{user:{error:action.error}})
  },
  [SIGN_OUT_USER]:{
    request: (state) => Object.assign({},state,{signOut:{isFetch:true}}),
    done: (state,action) => {
      storage.local.remove('state');
      return {signOut:{response:action.response}}
    },
    fail: (state,action) => {
      storage.local.remove('state');
      return {signOut:{error:action.error}}
    }
  }
},(state,action) => {
  switch (action.type) {
    case HEADER_RESET:
      return {user:state.user};
    default:
      return state;
  }
})
