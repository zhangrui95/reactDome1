import expect from 'expect'
import * as param from '../../src/utils/param'

describe('utils param', () => {

    it('formData2Param accept string should return string', () => {
      expect(param.formData2Param('string')).toEqual('string')
    });

    it('formData2Param accept simple one key object should return url param', () => {
        expect(param.formData2Param({a:'b'})).toEqual('a=b')
    });

    it('formData2Param accept simple two key object should return url param', () => {
        expect(param.formData2Param({a:'b',c:'d'})).toEqual('a=b&c=d')
    });

    it('formData2Param blank should replace +', () => {
        expect(param.formData2Param({a:'b c'})).toEqual('a=b+c')
    });

    it('formData2Param value should encode', () => {
        expect(param.formData2Param({a:'http://a.b/s?d=3&s=汗'})).toEqual('a='+encodeURIComponent('http://a.b/s?d=3&s=汗'))
    });

    it('formData2Param key should encode', () => {
        expect(param.formData2Param({'http://a.b/s?d=3&s=':'b'})).toEqual(encodeURIComponent('http://a.b/s?d=3&s=')+'=b')
    });

    it('formData2Param accept complex object should return url param', () => {
        expect(param.formData2Param({a:'b',c:{d:'e',f:'g'}})).toEqual('a=b&c.d=e&c.f=g')
    });

    it('formData2Param accept has array value object should return url param', () => {
        expect(param.formData2Param({a:'b',c:['d','e']})).toEqual('a=b&'+encodeURIComponent('c[0]')+'=d&'+encodeURIComponent('c[1]')+'=e')
    });

    it('formData2Param accept has object array value object should return url param', () => {
        expect(param.formData2Param({a:'b',c:[{d:'e',f:'g'},{h:'i'}]})).toEqual('a=b&'+encodeURIComponent('c[0]')+'.d=e&'+encodeURIComponent('c[0]')+'.f=g&'+encodeURIComponent('c[1]')+'.h=i')
    });

    it('formData2Param accept array should return url param', () => {
        expect(param.formData2Param([{name:'a',value:'b'},{name:'c',value:'d'}])).toEqual('a=b&c=d')
    });

    it('array2Param accept array should return url param', () => {
        expect(param.array2Param([{name:'a',value:'b'},{name:'c',value:'d'}])).toEqual('a=b&c=d')
    });

    it('array2Param accept array define custom key should return url param', () => {
        expect(param.array2Param([{name1:'a',value1:'b'},{name1:'c',value1:'d'}],{nameKey:'name1',valueKey:'value1'})).toEqual('a=b&c=d')
    });

    it('formData2Param accept FormData should return FormData', () => {
        const form = new window.FormData();
        form.append('a','b');
        expect(param.formData2Param(form)).toEqual(form)
    });

    it('formData2Param accept bool should return url param', () => {
        expect(param.formData2Param({a:'b',c:true})).toEqual('a=b&c=true')
    });

});
