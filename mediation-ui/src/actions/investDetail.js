import  {INVESTIGATION_ACTION_RESET} from '../constants/ActionTypes'

export function resetAction(data) {
    return {type:INVESTIGATION_ACTION_RESET,data}
}