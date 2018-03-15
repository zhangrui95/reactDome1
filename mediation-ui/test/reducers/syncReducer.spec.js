import expect from 'expect'
import {API_SYNC_TYPE} from '../../src/constants/ActionTypes'
import syncReducer from '../../src/reducers/syncReducer'

describe('sync reducer', () => {

    it('should handle initial state', () => {
        expect(
            syncReducer()(undefined, {})
        ).toEqual({})
    });

    it('should API_SYNC_TYPE REQUEST call request func', () => {
        const request = expect.createSpy();
        const done = expect.createSpy();
        const fail = expect.createSpy();
        syncReducer({'key':{request,done,fail}})(undefined, {type:'key',[API_SYNC_TYPE]:'REQUEST'});
        expect(request).toHaveBeenCalled();
        expect(done).toNotHaveBeenCalled();
        expect(fail).toNotHaveBeenCalled();
    });

    it('should API_SYNC_TYPE SUCCESS call done func', () => {
        const request = expect.createSpy();
        const done = expect.createSpy();
        const fail = expect.createSpy();
        syncReducer({'key':{request,done,fail}})(undefined, {type:'key',[API_SYNC_TYPE]:'SUCCESS'});
        expect(request).toNotHaveBeenCalled();
        expect(done).toHaveBeenCalled();
        expect(fail).toNotHaveBeenCalled();
    });

    it('should API_SYNC_TYPE FAILURE call fail func', () => {
        const request = expect.createSpy();
        const done = expect.createSpy();
        const fail = expect.createSpy();
        syncReducer({'key':{request,done,fail}})(undefined, {type:'key',[API_SYNC_TYPE]:'FAILURE'});
        expect(request).toNotHaveBeenCalled();
        expect(done).toNotHaveBeenCalled();
        expect(fail).toHaveBeenCalled();
    });

    it('should API_SYNC_TYPE other value not call any func return params state or initial', () => {
        const request = expect.createSpy();
        const done = expect.createSpy();
        const fail = expect.createSpy();
        const ret = syncReducer({'key':{request,done,fail}})(undefined, {type:'key',[API_SYNC_TYPE]:'xxx'});
        expect(request).toNotHaveBeenCalled();
        expect(done).toNotHaveBeenCalled();
        expect(fail).toNotHaveBeenCalled();
        expect(ret).toEqual({});
    });

    it('should no API_SYNC_TYPE not call any func return params state or initial', () => {
        const request = expect.createSpy();
        const done = expect.createSpy();
        const fail = expect.createSpy();
        const ret = syncReducer({'key':{request,done,fail}})(undefined, {type:'key'});
        expect(request).toNotHaveBeenCalled();
        expect(done).toNotHaveBeenCalled();
        expect(fail).toNotHaveBeenCalled();
        expect(ret).toEqual({});
    });

    it('should otherKey call other func', () => {
        const request = expect.createSpy();
        const done = expect.createSpy();
        const fail = expect.createSpy();
        const other = expect.createSpy();
        syncReducer({'key':{request,done,fail}},other)(undefined, {type:'otherKey'});
        expect(request).toNotHaveBeenCalled();
        expect(done).toNotHaveBeenCalled();
        expect(fail).toNotHaveBeenCalled();
        expect(other).toHaveBeenCalled();
    });

    it('should default other func return params state or initial', () => {
        const ret = syncReducer()(undefined, {type:'otherKey'});
        expect(ret).toEqual({});
    });

    it('should default request func return {}', () => {
        const ret = syncReducer({'key':{}})(undefined, {type:'key',[API_SYNC_TYPE]:'REQUEST'});
        expect(ret).toEqual({});
    });

    it('should default done func return state append response', () => {
        const response = {a:'b'};
        const ret = syncReducer({'key':{}})(undefined, {type:'key',[API_SYNC_TYPE]:'SUCCESS',response});
        expect(ret).toEqual({response});
    });

    it('should default fail func return state append error', () => {
        const error = 'test error';
        const ret = syncReducer({'key':{}})(undefined, {type:'key',[API_SYNC_TYPE]:'FAILURE',error});
        expect(ret).toEqual({error});
    });

});
