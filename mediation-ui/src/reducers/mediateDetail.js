import  {MEDIATE_DETAIL,MEDIATE_SAVE,MEDIATE_UPDATE,MEDIATE_ACTION_RESET} from '../constants/ActionTypes'
import syncReducer from './syncReducer'
import merge from 'lodash/merge'

export default syncReducer({
    [MEDIATE_DETAIL]:{ },
    [MEDIATE_SAVE]:{
        request: (state) => Object.assign({},state,{action:'add'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    },
    [MEDIATE_UPDATE]:{
        request: (state) => Object.assign({},state,{action:'update'}),
        done: (state, action) => Object.assign({},state,{actionResponse:action.response})
    }
},(state,action) => {
    switch (action.type) {
        case MEDIATE_ACTION_RESET:
            const ret = {action:'',actionResponse:null};
            if(action.data){
                ret.response = action.data
            }
            return merge({},state,ret);
        default:
            return state;
    }
})