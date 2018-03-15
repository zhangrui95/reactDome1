import {NAV_LIST,NAV_CHG_NUM} from '../constants/ActionTypes'
import syncReducer from './syncReducer'

export default syncReducer({[NAV_LIST]:{}},(state,action) => {
    switch (action.type) {
        case NAV_CHG_NUM:
            const navList = state.response.navList;
            const isMe = action.isMe;
            const subMe = action.subMe;
            const rebind = action.rebind;
            let item,route;
            for(let i in navList){
                item = navList[i];
                route = item.route;
                if(route==null){
                    continue;
                }
                if(rebind){
                    if(route.indexOf('/mine')!=-1 && isMe){
                        item.count = item.count*1+1;
                    }else if(route.indexOf('/mine')!=-1 && subMe){
                        item.count = item.count*1-1;
                    }
                }else{
                    if(route.indexOf('/mine')!=-1 && isMe){
                        item.count = item.count*1+1;
                    }else if(route.indexOf('/manage')!=-1){
                        item.count = item.count*1-1;
                    }
                }
            }
            return Object.assign({},state);
        default:
            return state;
    }
});
