/*ßoilerplate */

const crypto = require('crypto');

module.exports = function(str) {
    var secret = "@" + ß.HOSTNAME;
    return crypto.createHash('md5').update(str.toLowerCase() + secret).digest("hex");
};
