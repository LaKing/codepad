module.exports = function(socket) {

  	if (socket.username) return socket.username;
    	
  	if (!ß.basic_auth) return 'Guest';
    if (!socket) return undefined;
    if (!socket.handshake) return undefined;
  	if (!socket.handshake.headers) return undefined;
  
  	// by ip cash
    var ip = socket.handshake.headers["x-forwarded-for"];// || req.connection.remoteAddress;
  	if (ß.ipcash[ip]) return ß.ipcash[ip];
  
  	// by base64
    if (!socket.handshake.headers.authorization) return undefined;
    var userpass = new Buffer(socket.handshake.headers.authorization.split(' ')[1], 'base64').toString().split(":");
    return userpass.shift();

};