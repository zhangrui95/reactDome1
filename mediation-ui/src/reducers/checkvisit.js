import  {CHECKVISIT_DETAIL,CHECKVISIT_SAVE,CHECKVISIT_UPDATE,CHECKVISIT_ACTION_RESET} from '../constants/ActionTypes'
import syncReducer from './syncReducer'
import merge from 'lodash/merge'

export default syncReducer({
    [CHECKVISIT_DETAIL]:{},
    [CHECKVISIT_SAVE]:{
        request: (state) => Object.assign({},state,{action:'add'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    },
    [CHECKVISIT_UPDATE]:{
        request: (state) => Object.assign({},state,{action:'update'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    }
},(state,action) => {
    switch (action.type) {
        case CHECKVISIT_ACTION_RESET:
            const ret = {action:'',actionResponse:null};
            if(action.data){
                ret.response = action.data
            }
            return merge({},state,ret);
        default:
            return state;
    }
})