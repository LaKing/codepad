/*ßoilerplate */

var crypto = require('crypto');

function getBinarySize(input) {
    return Number(Buffer.byteLength(String(input), 'utf8'));
}

// This is the common common sourcestring creation method
function getBinarySized(input) {
    return String(String(getBinarySize(input)) + String(input));
}


// Instant Payment Notification for simplepay
module.exports = function(data) {

    var str = '';
    Object.keys(data).forEach(function(k) {
        if (k === 'HASH') return;
        if (typeof data[k] !== 'string')
            Object.keys(data[k]).forEach(function(kk) {
                str += getBinarySized(data[k][kk]);
            });
        else str += getBinarySized(data[k]);
    });
    var hmac = crypto.createHmac('md5', ß.simplepay_config.secretKey);
    var hash = hmac.update(str, 'utf8').digest('hex');
    if (hash === data.HASH) return true;
    return false;
};