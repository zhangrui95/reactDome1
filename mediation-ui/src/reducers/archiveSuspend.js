import  {SUSPEND_WORK,SUSPEND_WORK_RESET} from '../constants/ActionTypes'
import syncReducer from './syncReducer'

export default syncReducer({
    [SUSPEND_WORK]:{ }
},(state,action) => {
    switch (action.type) {
        case SUSPEND_WORK_RESET:
            return {};
        default:
            return state;
    }
})
