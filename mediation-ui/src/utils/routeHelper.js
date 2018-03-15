import storage from './storage'
import {basename} from './body'
import {PATH_ROUTE_KEY} from '../constants/Constant'

const usePageRecover = false;

export function getRoute(list,key){
    if(!usePageRecover){
        return;
    }
    const pathRoute = storage.local.data(PATH_ROUTE_KEY);
    if(pathRoute==null||pathRoute==''){
        return;
    }
    try{
        const prObj = window.JSON.parse(pathRoute);
        const {items,curr} = prObj;
        const item = items[key];
        const {idx,route} = item;
        if(idx >= list.length){
            return;
        }
        let basePath = basename+list[idx].route;
        basePath = basePath.replace('//','/');
        if(basePath == route){
            return {route:curr,idx};
        }
    }catch (e){
        storage.local.remove(PATH_ROUTE_KEY);
    }
}

export function saveRoute(idx, route, config){
    if(!usePageRecover){
        return;
    }
    let prObj;
    const pathRoute = storage.local.data(PATH_ROUTE_KEY);
    if(pathRoute!=null&&pathRoute!=''){
        try{
            const {items} = window.JSON.parse(pathRoute);
            const lv = config.lv;
            const newItems = {};
            let item;
            for(const i in items){
                item = items[i];
                if(item.lv<lv){
                    newItems[i] = item;
                }
            }
            newItems[config.key] = {idx,route,lv};
            prObj = {items:newItems,curr:route};
        }catch (e){}
    }else{
        prObj = {items:{[config.key]:{idx,route,lv:config.lv}},curr:route};
    }
    storage.local.data(PATH_ROUTE_KEY,window.JSON.stringify(prObj));
}