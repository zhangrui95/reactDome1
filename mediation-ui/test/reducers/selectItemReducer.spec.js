import expect from 'expect'
import {API_SYNC_TYPE} from '../../src/constants/ActionTypes'
import selectItemReducer from '../../src/reducers/selectItemReducer'

describe('select item reducer', () => {

    it('should handle initial state', () => {
        expect(
            selectItemReducer(undefined, {})
        ).toEqual({})
    });

    it('should SELECT_DATA REQUEST set option', () => {
        const option = {key:'test'};
        expect(
            selectItemReducer({}, {option,type:'SELECT_DATA',[API_SYNC_TYPE]:'REQUEST'})
        ).toEqual({})
    });

    it('should SELECT_DATA SUCCESS set option', () => {
        const response = {result:1};
        expect(
            selectItemReducer({}, {response,type:'SELECT_DATA',[API_SYNC_TYPE]:'SUCCESS',domain:'test'})
        ).toEqual({test:response})
    });

    it('should SELECT_DATA FAILURE set option', () => {
        expect(
            selectItemReducer({}, {error:'test',type:'SELECT_DATA',[API_SYNC_TYPE]:'FAILURE'})
        ).toEqual({error:'test'})
    });


});
