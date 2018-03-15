import expect from 'expect'
import {API_SYNC_TYPE} from '../../src/constants/ActionTypes'
import lists from '../../src/reducers/lists'

describe('list reducer', () => {

    it('should handle initial state', () => {
      expect(
          lists(undefined, {})
      ).toEqual({})
    });

    it('should LIST_ENT REQUEST set option', () => {
        const option = {limit:10};
        expect(
            lists(undefined, {option,type:'LIST_ENT',[API_SYNC_TYPE]:'REQUEST'})
        ).toEqual({option})
    });

    it('should LIST_ENT SUCCESS set option', () => {
        const response = {data:[{id:1},{id:2}],total:2};
        expect(
            lists({option:{start:0,limit:10}}, {response,type:'LIST_ENT',[API_SYNC_TYPE]:'SUCCESS'})
        ).toEqual({option:{start:0,limit:10,count:2,total:1,displayStart:1,displayEnd:2},response})
    });

    it('should LIST_ENT FAILURE set option', () => {
        expect(
            lists({option:{start:0,limit:10}}, {error:'test',type:'LIST_ENT',[API_SYNC_TYPE]:'FAILURE'})
        ).toEqual({option:{start:0,limit:10},error:'test'})
    });


});
