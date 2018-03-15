let r20 = /%20/g;

function arrayInObject2Param(data,prefix){
    let list = [],currPrefix,curr;
    for(let i in data){
        curr = data[i];
        currPrefix = prefix+'['+i+']';
        var dataType = typeof curr;
        if (dataType === 'string'){
            list.push({name:currPrefix,value:curr})
        }else if (dataType === 'object'){
            list = list.concat(Array.isArray(curr)? arrayInObject2Param(curr,currPrefix) : object2Param(curr,currPrefix+'.'));
        }
    }
    return list;
}

function object2Param(data,prefix){
    let list = [],currPrefix = prefix||'',curr;
    for(let i in data){
        curr = data[i];
        var dataType = typeof curr;
        if (dataType === 'string' || dataType === 'number' || dataType === 'boolean'){
            list.push({name:currPrefix+i,value:curr})
        }else if (dataType === 'object'){
            list = list.concat(Array.isArray(curr)?  arrayInObject2Param(curr,i) : object2Param(curr,i+'.'));
        }
    }
    return list;
}

export function array2Param(list,option = {nameKey:'name',valueKey:'value'}){
    return list.map(it=>encodeURIComponent(it[option.nameKey])+'='+encodeURIComponent(it[option.valueKey])).join('&').replace(r20,'+');
}

export function formData2Param(formData){
    var dataType = typeof formData;
    if (dataType === 'string' || dataType === 'number'){
        return formData;
    }
    if (dataType === 'object'){
        if(formData instanceof window.FormData){
            return formData;
        }
        return Array.isArray(formData) ? array2Param(formData) :array2Param(object2Param(formData));
    }
}