/**
 * Created by zmouse on 2017/8/22.
 * E-mail: zmouse@miaov.com
 * GitHub: zmouse@github.com
 */

export default function(value) {
    value = Number(value);
    if (Number.isNaN(value)) {
        return 0;
    }
    return value < 10000 ? value : Math.ceil(value / 10000) + '万';
}
