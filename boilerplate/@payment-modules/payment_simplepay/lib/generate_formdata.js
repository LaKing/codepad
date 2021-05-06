/*ßoilerplate */

const HOSTNAME = ß.HOSTNAME;
var crypto = require('crypto');

function getHRDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = '0' + (date.getMonth() + 1); // "+ 1" becouse the 1st month is 0
    var day = '0' + date.getDate();
    var hour = '0' + date.getHours();
    var minutes = '0' + date.getMinutes();
    var seconds = '0' + date.getSeconds();
    var ret = year + '-' + month.slice(-2) + '-' + day.slice(-2) + ' ' + hour.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);
    return ret;
}

// calculate length of string honoring double byte representations similar to PHP
// that means charcaters like ÉÁŰŐÚÖÜÓÍ are two-long
function getBinarySize(input) {
    return Number(Buffer.byteLength(String(input), 'utf8'));
}

// This is the common common sourcestring creation method
function getBinarySized(input) {
    return String(String(getBinarySize(input)) + String(input));
}

function calculate_simplepay_hash(f) {

    str = '';
    str += getBinarySized(f.MERCHANT);
    str += getBinarySized(f.ORDER_REF);
    str += getBinarySized(f.ORDER_DATE);

    var i;
    for (i = 0; i < f.items.length; i++) str += getBinarySized(f.items[i].ORDER_PNAME);
    for (i = 0; i < f.items.length; i++) str += getBinarySized(f.items[i].ORDER_PCODE);
    for (i = 0; i < f.items.length; i++) str += getBinarySized(f.items[i].ORDER_PINFO);
    for (i = 0; i < f.items.length; i++) str += getBinarySized(f.items[i].ORDER_PRICE);
    for (i = 0; i < f.items.length; i++) str += getBinarySized(f.items[i].ORDER_QTY);
    for (i = 0; i < f.items.length; i++) str += getBinarySized(f.items[i].ORDER_VAT);

    str += getBinarySized(f.ORDER_SHIPPING);
    str += getBinarySized(f.PRICES_CURRENCY);
    str += getBinarySized(f.DISCOUNT);
    str += getBinarySized(f.PAY_METHOD);

    var hmac = crypto.createHmac('md5', ß.simplepay_config.secretKey);
    var hash = hmac.update(str, 'utf8').digest('hex');
    return hash;
}




module.exports = function(p) {
    var f = {};

    f.MERCHANT = ß.simplepay_config.merchant;
    f.ORDER_REF = p.ref;
    f.ORDER_DATE = getHRDate();
    f.PRICES_CURRENCY = p.currency;
    f.PAY_METHOD = 'CCVISAMC';
    f.BILL_EMAIL = p.email;
    f.BACK_REF = "https://" + HOSTNAME + '/simplepay-callback?ref=' + p.ref;
    f.items = [];

    for (var i = 0; i < p.items.length; i++) {
        f.items[i] = {};
        f.items[i].ORDER_PNAME = p.items[i].name.substring(0, 127);
        f.items[i].ORDER_PCODE = p.items[i].code.substring(0, 63);
        f.items[i].ORDER_PINFO = p.items[i].info.substring(0, 127);
        f.items[i].ORDER_PRICE = p.items[i].net;
        f.items[i].ORDER_QTY = p.items[i].qty;
        f.items[i].ORDER_VAT = p.items[i].vat;
    }

    f.ORDER_SHIPPING = '0';
    f.DISCOUNT = '0';

    f.ORDER_HASH = calculate_simplepay_hash(f);

    return f;
};