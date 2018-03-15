import  {ENT_BIND,ENT_BIND_RESET} from '../constants/ActionTypes'
import syncReducer from './syncReducer'

export default syncReducer({
    [ENT_BIND]:{
        request:(state,action) => {return {pid:action.pid,old:action.old}}
    }
},(state,action) => {
    switch (action.type) {
        case ENT_BIND_RESET:
            return {};
        default:
            return state;
    }
})
