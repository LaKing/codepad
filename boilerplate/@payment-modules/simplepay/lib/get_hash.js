const crypto = require("crypto");

module.exports = function get_hash(key, text) {
    return crypto
        .createHmac("sha384", key)
        .update(text)
        .digest()
        .toString("base64");
};

