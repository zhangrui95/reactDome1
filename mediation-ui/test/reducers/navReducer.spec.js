import expect from 'expect'
import {API_SYNC_TYPE} from '../../src/constants/ActionTypes'
import navReducer from '../../src/reducers/navReducer'

describe('nav reducer', () => {

    it('should handle initial state', () => {
        expect(
            navReducer(undefined, {})
        ).toEqual({})
    });

    it('should NAV_LIST REQUEST set option', () => {
        const option = {};
        expect(
            navReducer(undefined, {option,type:'NAV_LIST',[API_SYNC_TYPE]:'REQUEST'})
        ).toEqual(option)
    });

    it('should NAV_LIST SUCCESS set option', () => {
        const response = {result:1};
        expect(
            navReducer({}, {response,type:'NAV_LIST',[API_SYNC_TYPE]:'SUCCESS'})
        ).toEqual({response})
    });

    it('should NAV_LIST FAILURE set option', () => {
        expect(
            navReducer({}, {error:'test',type:'NAV_LIST',[API_SYNC_TYPE]:'FAILURE'})
        ).toEqual({error:'test'})
    });


});
