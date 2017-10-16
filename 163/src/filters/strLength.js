export default function(value) {
    let str = value + '';
    let newStr = ''
    if (str.length) {
        if (str.length >= 17) {
            newStr = str.substring(0, 17) + '…';
            return newStr;
        } else {
            return str;
        }
    }


}