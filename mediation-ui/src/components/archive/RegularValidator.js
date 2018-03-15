/**
 * Created by Administrator on 2017/7/17 0017.
 */
export function cardValid(value) {
        let ex = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(19|2[0-9])((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
        let pattern = new RegExp(ex);
        if(!pattern.test(value)){
            return false;
        }
        let params = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
        let checks = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
        let id=value;
        let sum = 0;
        for (var i = 0; i < 17; i++) {
            var tmp = id.charAt(i);
            sum += params[i] * tmp;
        }
        sum %= 11;
        let check;
        if (id.charAt(17) == 'x' || id.charAt(17) == 'X') {
            check = 10;
        } else {
            check = id.charAt(17);
        }
        return check == checks[sum];
}