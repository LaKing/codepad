/*ßoilerplate */
var crypto = require('crypto');

function getBinarySize(input) {
    return Number(Buffer.byteLength(String(input), 'utf8'));
}

// This is the common common sourcestring creation method
function getBinarySized(input) {
    return String(String(getBinarySize(input)) + String(input));
}


function getPRDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = '0' + (date.getMonth() + 1); // "+ 1" becouse the 1st month is 0
    var day = '0' + date.getDate();
    var hour = '0' + date.getHours();
    var minutes = '0' + date.getMinutes();
    var seconds = '0' + date.getSeconds();
    var ret = year + month.slice(-2) + day.slice(-2) + hour.slice(-2) + minutes.slice(-2) + seconds.slice(-2);
    return ret;
}

module.exports = function(data) {
    var str = '';
    var date = getPRDate();

    str += getBinarySized(data.IPN_PID[0]);
    str += getBinarySized(data.IPN_PNAME[0]);
    str += getBinarySized(data.IPN_DATE);
    str += getBinarySized(date);
    var hmac = crypto.createHmac('md5', ß.simplepay_config.secretKey);
    var hash = hmac.update(str, 'utf8').digest('hex');
    return "<EPAYMENT>" + date + '|' + hash + "</EPAYMENT>";
};