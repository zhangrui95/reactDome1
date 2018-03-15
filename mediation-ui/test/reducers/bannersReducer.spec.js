import expect from 'expect'
import {API_SYNC_TYPE} from '../../src/constants/ActionTypes'
import bannersReducer from '../../src/reducers/bannersReducer'

describe('banner reducer', () => {

    it('should handle initial state', () => {
        expect(
            bannersReducer(undefined, {})
        ).toEqual({})
    });

    it('should BANNER REQUEST set option', () => {
        const option = {key:'test'};
        expect(
            bannersReducer(undefined, {option,type:'BANNER',[API_SYNC_TYPE]:'REQUEST'})
        ).toEqual({option})
    });

    it('should BANNER SUCCESS set option', () => {
        const response = {result:1};
        expect(
            bannersReducer({}, {response,type:'BANNER',[API_SYNC_TYPE]:'SUCCESS'})
        ).toEqual({response})
    });

    it('should BANNER FAILURE set option', () => {
        expect(
            bannersReducer({}, {error:'test',type:'BANNER',[API_SYNC_TYPE]:'FAILURE'})
        ).toEqual({error:'test'})
    });


});
