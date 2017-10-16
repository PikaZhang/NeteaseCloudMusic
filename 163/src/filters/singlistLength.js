export default function(value) {
    let str = value + '';
    let newStr = ''
    if (str.length) {
        if (str.length >= 80) {
            newStr = str.substring(0, 80) + '…';
            return newStr;
        } else {
            return str;
        }
    }


}