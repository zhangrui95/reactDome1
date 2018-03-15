import expect from 'expect'
import {CALL_API} from '../../src/constants/ActionTypes'
import * as syncActions from '../../src/actions/syncAction'

describe('sync actions', () => {
    it('test request no action msg', () => {
        const dispatch = expect.createSpy();
        syncActions.request('NAV_LIST')(dispatch);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {type: 'NAV_LIST',endpoint: 'api/user/menu.json'}
        });
    });

    it('test request has action msg', () => {
        const dispatch = expect.createSpy();
        syncActions.request('BANNER',{option:{url:'/banner/test'}})(dispatch);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {type: 'BANNER',endpoint: '/banner/test'},
            option:{url:'/banner/test'}
        });
    });

    it('test request has other msg', () => {
        const dispatch = expect.createSpy();
        syncActions.request('ENT_BIND',null,'eId','pId')(dispatch);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {
                type: 'ENT_BIND',
                endpoint: 'api/enterprise/assgiedEnterpriseToUser.json',
                option:{ method: 'POST', body: 'entId=eId&userId=pId',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }
            }
        });
    });

    it('test request loadUser', () => {
        const dispatch = expect.createSpy();
        syncActions.request('LOAD_USER')(dispatch);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {type: 'LOAD_USER',endpoint: 'api/user/me.json'}
        });
    });

    it('test request updatePass', () => {
        const dispatch = expect.createSpy();
        syncActions.request('UPDATE_PASS',null,'oldPass','newPass')(dispatch);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {
                type: 'UPDATE_PASS',
                endpoint: 'api/user/uppass.json',
                option:{ method: 'POST', body: "oldPassword=oldPass&newPassword=newPass",
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }
            }
        });
    });

    it('test request loadSelect', () => {
        const dispatch = expect.createSpy();
        syncActions.request('SELECT_DATA',{domain:'aDomain'},'aUrl')(dispatch);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {
                type: 'SELECT_DATA',
                endpoint: 'aUrl'
            }
            ,domain:'aDomain'
        });
    });

    it('test loadEntList', () => {
        const dispatch = expect.createSpy();
        const option = {url:'http://localhost:8081/page',start:20,limit:10};
        syncActions.request('LIST_ENT',{option})(dispatch);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {
                type: 'LIST_ENT',
                endpoint: `http://localhost:8081/page`,
                option:{ method: 'POST', body: 'offset=20&max=10',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }
            },
            option:{url:'http://localhost:8081/page',start:20,limit:10}
        });
    });

    it('test reloadEntList', () => {
        const dispatch = expect.createSpy();
        const option = {url:'http://localhost:8081/page',start:20,limit:10,body:'a=b'};
        const getState = expect.createSpy().andReturn({lists:{option:option}});
        syncActions.request('LIST_ENT_RELOAD')(dispatch,getState);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {
                type: 'LIST_ENT',
                endpoint: `http://localhost:8081/page`,
                option:{ method: 'POST', body: 'a=b&offset=20&max=10',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }
            },
            option
        });
    });

    it('test queryEntList by string', () => {
        const dispatch = expect.createSpy();
        const option = {url:'http://localhost:8081/page',start:20,limit:10};
        const getState = expect.createSpy().andReturn({lists:{option:option}});
        syncActions.request('LIST_ENT_QUERY',null,'a=b')(dispatch,getState);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {
                type: 'LIST_ENT',
                endpoint: `http://localhost:8081/page`,
                option:{ method: 'POST', body: 'a=b&offset=0&max=10',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }
            },
            option
        });
    });

    it('test queryEntList by object', () => {
        const dispatch = expect.createSpy();
        const option = {url:'http://localhost:8081/page',start:20,limit:10};
        const getState = expect.createSpy().andReturn({lists:{option:option}});
        syncActions.request('LIST_ENT_QUERY',null,{a:'b'})(dispatch,getState);
        apiExpect(dispatch).toHaveBeenCalledWith({
            [CALL_API]: {
                type: 'LIST_ENT',
                endpoint: `http://localhost:8081/page`,
                option:{ method: 'POST', body: 'a=b&offset=0&max=10',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }
            },
            option
        });
    });
});

function apiExpect(spy) {
    const result = spy.calls[0].arguments[0];
    return {
        toHaveBeenCalledWith:function(target){
            expect(result).toEqual(target);
            expect(result[CALL_API]).toEqual(target[CALL_API]);
        }
    };
}
