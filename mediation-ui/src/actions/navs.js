import  {NAV_CHG_NUM} from '../constants/ActionTypes'

export function chgNum(isMe = false,subMe = false,rebind = false) {
    return {type:NAV_CHG_NUM,isMe,subMe,rebind}
}