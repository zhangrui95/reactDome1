
class BrowserStorage {

    constructor(storage) {
        this.storage = storage;
    };

    data(key,data) {
        if(key != null){
            if(data != null){
                this.storage.setItem(key,data)
            }else{
                return this.storage.getItem(key)
            }
        }
    }

    remove(key) {
        if(key != null){
            this.storage.removeItem(key)
        }
    }

    key(idx) {
        return this.storage.key(idx);
    }

    clear() {
        this.storage.clear();
    }

    lenth() {
        return this.storage.length;
    }

}

export default {
    local :new BrowserStorage(localStorage)
}