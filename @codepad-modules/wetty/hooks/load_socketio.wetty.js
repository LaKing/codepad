/*jshint esnext: true */
const server = require('socket.io');

module.exports = function(httpsServer) {
  ß.wio = server(httpsServer, {
    path: '/wetty/socket.io'
 });
};