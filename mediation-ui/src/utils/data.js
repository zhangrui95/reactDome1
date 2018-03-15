
export function getPathVal(data, dataKey){
    let path = dataKey;
    if(path === null || path === undefined){
        return;
    }
    path = path.split('.');
    let ret = data;
    for(let i in path){
        ret = ret[path[i]];
        if(ret === null || ret === undefined){
            return;
        }
    }
    return ret;
}

export function getPathValOrDefault(data, dataKey,defaultVal){
    const ret = getPathVal(data,dataKey);
    return (ret === null || ret === undefined) ? defaultVal:ret;
}

export function getPathValNotEmpty(data, dataKey,defaultVal){
    const ret = getPathVal(data,dataKey);
    return (ret === null || ret === undefined || ret === '') ? defaultVal:ret;
}

export function getPathValSep(data, dataKey){
    return getPathValNotEmpty(data,dataKey,'');
}