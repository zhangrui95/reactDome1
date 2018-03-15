export function setBodyClass(className) {
    const body = document.getElementsByTagName('BODY')[0];
    const old = body.getAttribute('class');
    if(className==old){
        return;
    }
    body.setAttribute('class',className);
}

export function setMainClass(className) {
    const main = document.getElementById('main');
    const old = main.getAttribute('class');
    if(className==old){
        return;
    }
    main.setAttribute('class',className);
}

export function setHeaderClass(className) {
    const print = document.getElementById('print');
    const old = print.getAttribute('class');
    if(className==old){
        return;
    }
    print.setAttribute('class',className);
}

export function setFooterClass(className) {
    const print = document.getElementById('print-footer');
    const old = print.getAttribute('class');
    if(className==old){
        return;
    }
    print.setAttribute('class',className);
}


const getBasename = () => {
    const bases = document.getElementsByTagName('base');
    if(bases.length==0){
        return;
    }
    const baseURI = bases[0].getAttribute('href');
    if(baseURI==null){
        return;
    }
    const origin = location.origin+'/';
    let contextPath = baseURI.replace(origin,'');
    contextPath = contextPath.endsWith('/')?contextPath.substring(0,contextPath.length-1):contextPath;
    contextPath = contextPath.startsWith('/')?contextPath:('/'+contextPath);
    return contextPath;
};

export const basename = getBasename();