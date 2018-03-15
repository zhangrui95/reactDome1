import  {PROTOCOL_ACTION_RESET} from '../constants/ActionTypes'

export function resetAction(data) {
    return {type:PROTOCOL_ACTION_RESET,data}
}