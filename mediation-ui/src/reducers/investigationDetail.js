import  {INVESTIGATION_DETAIL,INVESTIGATION_SAVE,INVESTIGATION_UPDATE,INVESTIGATION_ACTION_RESET} from '../constants/ActionTypes'
import syncReducer from './syncReducer'
import merge from 'lodash/merge'

export default syncReducer({
    [INVESTIGATION_DETAIL]:{ },
    [INVESTIGATION_SAVE]:{
        request: (state) => Object.assign({},state,{action:'add'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    },
    [INVESTIGATION_UPDATE]:{
        request: (state) => Object.assign({},state,{action:'update'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    }
},(state,action) => {
    switch (action.type) {
        case INVESTIGATION_ACTION_RESET:
            const ret = {action:'',actionResponse:null};
            if(action.data){
                ret.response = action.data;
                ((state.response||{}).data||{}).workers = null;
            }
            return merge({},state,ret);
        default:
            return state;
    }
})