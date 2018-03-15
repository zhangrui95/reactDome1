import expect from 'expect'
import * as enterpriseActions from '../../src/actions/enterprise'

describe('enterprise actions', () => {
    it('test reset', () => {
        expect(enterpriseActions.reset()).toEqual({type:'ENT_BIND_RESET'});
    });
});
