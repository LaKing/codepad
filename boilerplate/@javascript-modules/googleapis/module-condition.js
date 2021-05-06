/*ßoilerplate */

// https://github.com/googleapis/google-api-nodejs-client

const keyfile = ß.CWD + "/config/google-privatekey.json";

module.exports = function() {
    if (ß.fs.existsSync(keyfile)) return true;
    ß.ntc("- googleapis has no privatekey. Module cannot be enabled.");
    return false;
};