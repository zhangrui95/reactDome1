import expect from 'expect'
import {API_SYNC_TYPE} from '../../src/constants/ActionTypes'
import enterprise from '../../src/reducers/enterprise'

describe('enterprise reducer', () => {

    it('should handle initial state', () => {
        expect(
            enterprise(undefined, {})
        ).toEqual({})
    });

    it('should ENT_BIND REQUEST set option', () => {
        const option = {};
        expect(
            enterprise(undefined, {pid:'1',old:'2',option,type:'ENT_BIND',[API_SYNC_TYPE]:'REQUEST'})
        ).toEqual({pid:'1',old:'2'})
    });

    it('should ENT_BIND_RESET set option', () => {
        const option = {};
        expect(
            enterprise({a:'b'}, {option,type:'ENT_BIND_RESET'})
        ).toEqual(option)
    });

    it('should ENT_BIND SUCCESS set option', () => {
        const response = {result:1};
        expect(
            enterprise({}, {response,type:'ENT_BIND',[API_SYNC_TYPE]:'SUCCESS'})
        ).toEqual({response})
    });

    it('should ENT_BIND FAILURE set option', () => {
        expect(
            enterprise({}, {error:'test',type:'ENT_BIND',[API_SYNC_TYPE]:'FAILURE'})
        ).toEqual({error:'test'})
    });


});
