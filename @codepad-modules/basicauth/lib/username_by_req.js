module.exports = function(req) {
    if (!ß.basic_auth) return 'Guest';
    if (!req) return undefined;
    if (!req.headers) return undefined;
    if (!req.headers.authorization) return undefined;
    var userpass = new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString().split(":");
    return userpass.shift();

};