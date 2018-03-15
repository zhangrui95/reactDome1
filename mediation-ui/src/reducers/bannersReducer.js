import {BANNER,BANNER_CHG_NUM} from '../constants/ActionTypes'
import syncReducer from './syncReducer'

export default syncReducer({
    [BANNER]:{
        request:(state,action) => {return {option:action.option}}
    }
},(state,action) => {
    switch (action.type) {
        case BANNER_CHG_NUM:
            const bannerList = state.response.bannerList;
            let item,route;
            for(let i in bannerList){
                item = bannerList[i];
                route = item.route;
                if(route==null){
                    continue;
                }
                if(route.indexOf('/managed')!=-1){
                    item.count = item.count*1+1;
                }else if(route.indexOf('/unmanage')!=-1){
                    item.count = item.count*1-1;
                }
            }
            return Object.assign({},state);
        default:
            return state;
    }
})

