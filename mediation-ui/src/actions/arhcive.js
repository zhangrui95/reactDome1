import  {ARCHIVE_DETAIL_RESET,ARCHIVE_ACTION_RESET,
    ARCHIVE_SET_PROTOCOL,ARCHIVE_SET_CHECK} from '../constants/ActionTypes'

export function reset() {
    return {type:ARCHIVE_DETAIL_RESET}
}

export function resetAction(data) {
    return {type:ARCHIVE_ACTION_RESET,data}
}

export function setProtocol(data) {
    return {type:ARCHIVE_SET_PROTOCOL,data}
}

export function setCheck(data) {
    return {type:ARCHIVE_SET_CHECK,data}
}