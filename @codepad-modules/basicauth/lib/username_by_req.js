module.exports = function(req) {
    if (!ß.basic_auth) return 'Guest';
    if (!req) return undefined;

    if (req.auth) if (req.auth.user) return req.auth.user;

    if (!req.headers) return undefined;
    if (!req.headers.authorization) return undefined;
    var userpass = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString().split(":");
    return userpass.shift();

};