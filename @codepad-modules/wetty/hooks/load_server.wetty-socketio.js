/*ßoilerplate */

module.exports = function(httpsServer) {
  ß.wio = ß.socketio(httpsServer, {
    path: '/wetty/socket.io'
 });
};