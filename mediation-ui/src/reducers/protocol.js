import  {PROTOCOL_DETAIL,PROTOCOL_SAVE,PROTOCOL_UPDATE,PROTOCOL_ACTION_RESET} from '../constants/ActionTypes'
import syncReducer from './syncReducer'
import merge from 'lodash/merge'

export default syncReducer({
    [PROTOCOL_DETAIL]:{ },
    [PROTOCOL_SAVE]:{
        request: (state) => Object.assign({},state,{action:'add'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    },
    [PROTOCOL_UPDATE]:{
        request: (state) => Object.assign({},state,{action:'update'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    },
},(state,action) => {
    switch (action.type) {
        case PROTOCOL_ACTION_RESET:
            const ret = {action:'',actionResponse:null};
            if(action.data){
                ret.response = action.data
            }
            return merge({},state,ret);
        default:
            return state;
    }
})