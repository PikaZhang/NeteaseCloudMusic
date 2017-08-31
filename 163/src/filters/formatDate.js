/**
 * Created by zmouse on 2017/8/22.
 * E-mail: zmouse@miaov.com
 * GitHub: zmouse@github.com
 */

export default function(value, f) {
    const date = new Date(value);

    let str = f ? f : 'y-m-d H:i:s';

    str = str.replace('y', date.getFullYear());
    str = str.replace('m', date.getMonth() + 1);
    str = str.replace('d', date.getDate());
    str = str.replace('H', date.getHours());
    str = str.replace('i', toDB(date.getMinutes()));
    str = str.replace('s', toDB(date.getSeconds()));

    return str;

}

function toDB(nub) {
    return nub < 10 ? "0" + nub : "" + nub;
}