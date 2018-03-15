import expect from 'expect'
import {API_SYNC_TYPE} from '../../src/constants/ActionTypes'
import headerReducer from '../../src/reducers/headerReducer'

describe('header reducer', () => {

    it('should handle initial state', () => {
        expect(
            headerReducer(undefined, {})
        ).toEqual({})
    });

    it('should UPDATE_PASS REQUEST set option', () => {
        const option = {};
        expect(
            headerReducer(undefined, {option,type:'UPDATE_PASS',[API_SYNC_TYPE]:'REQUEST'})
        ).toEqual(option)
    });

    it('should UPDATE_PASS SUCCESS set option', () => {
        const response = {upStatus:'1'};
        expect(
            headerReducer({}, {response,type:'UPDATE_PASS',[API_SYNC_TYPE]:'SUCCESS'})
        ).toEqual({updatePass:{response}})
    });

    it('should UPDATE_PASS FAILURE set option', () => {
        expect(
            headerReducer({}, {error:'test',type:'UPDATE_PASS',[API_SYNC_TYPE]:'FAILURE'})
        ).toEqual({updatePass:{error:'test'}})
    });

    it('should LOAD_USER REQUEST set option', () => {
        const option = {};
        expect(
            headerReducer(undefined, {option,type:'LOAD_USER',[API_SYNC_TYPE]:'REQUEST'})
        ).toEqual(option)
    });

    it('should LOAD_USER SUCCESS set option', () => {
        const response = {name:'小燕子'};
        expect(
            headerReducer({}, {response,type:'LOAD_USER',[API_SYNC_TYPE]:'SUCCESS'})
        ).toEqual({user:{response}})
    });

    it('should LOAD_USER FAILURE set option', () => {
        expect(
            headerReducer({}, {error:'test',type:'LOAD_USER',[API_SYNC_TYPE]:'FAILURE'})
        ).toEqual({user:{error:'test'}})
    });

    it('should SIGN_IN_USER REQUEST set option', () => {
        const option = {};
        expect(
            headerReducer(undefined, {option,type:'SIGN_IN_USER',[API_SYNC_TYPE]:'REQUEST'})
        ).toEqual(option)
    });

    it('should SIGN_IN_USER SUCCESS set option', () => {
        const user = {name:'小燕子'};
        const response = {user,state:0};
        expect(
            headerReducer({}, {response,type:'SIGN_IN_USER',[API_SYNC_TYPE]:'SUCCESS'})
        ).toEqual({user:{response}})
    });

    it('should SIGN_IN_USER FAILURE set option', () => {
        expect(
            headerReducer({}, {error:'test',type:'SIGN_IN_USER',[API_SYNC_TYPE]:'FAILURE'})
        ).toEqual({user:{error:'test'}})
    });

    it('should SIGN_OUT_USER REQUEST set option', () => {
        const option = {};
        expect(
            headerReducer(undefined, {option,type:'SIGN_OUT_USER',[API_SYNC_TYPE]:'REQUEST'})
        ).toEqual({signOut:{isFetch:true}})
    });

    it('should SIGN_OUT_USER SUCCESS set option', () => {
        const response = {state:0};
        expect(
            headerReducer({user:{name:'小燕子'}}, {response,type:'SIGN_OUT_USER',[API_SYNC_TYPE]:'SUCCESS'})
        ).toEqual({signOut:{response}})
    });

    it('should SIGN_OUT_USER FAILURE set option', () => {
        expect(
            headerReducer({user:{name:'小燕子'}}, {error:'test',type:'SIGN_OUT_USER',[API_SYNC_TYPE]:'FAILURE'})
        ).toEqual({signOut:{error:'test'}})
    });


});
