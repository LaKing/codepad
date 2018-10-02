module.exports = function(socket) {
    if (!ß.basic_auth) return 'Guest';
    if (!socket) return undefined;
    if (!socket.handshake) return undefined;
    if (!socket.handshake.headers) return undefined;
    if (!socket.handshake.headers.authorization) return undefined;
    var userpass = new Buffer(socket.handshake.headers.authorization.split(' ')[1], 'base64').toString().split(":");
    return userpass.shift();

};