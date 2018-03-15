import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

class localStorageMock {
    constructor(){this.length = 0;}
    key(idx){}
    getItem(key){}
    setItem(key,data){}
    removeItem(key){}
    clear(){}
}
global.localStorage = new localStorageMock();
