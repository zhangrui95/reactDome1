import {API_SYNC_TYPE,TYPE_REQUEST,TYPE_SUCCESS,TYPE_FAILURE} from '../constants/ActionTypes'

const initialState = {};

const defaultRequest = () => {return {}};
const defaultDone = (state, action) => Object.assign({},state,{response:action.response});
const defaultFail = (state, action) => Object.assign({},state,{error:action.error});
const defaultOther = (state, action) => state;

export default function syncReducer(reducer,other){
    return (state = initialState, action) => {
        const config = (reducer||{})[action.type];
        if(config){
            const apiSyncType = action[API_SYNC_TYPE];
            switch (apiSyncType) {
                case TYPE_REQUEST:
                    return (config.request||defaultRequest)(state, action);
                case TYPE_SUCCESS:
                    return (config.done||defaultDone)(state, action);
                case TYPE_FAILURE:
                    return (config.fail||defaultFail)(state, action);
                default:
                    return state
            }
        }else{
            return (other||defaultOther)(state, action);
        }
    };
}