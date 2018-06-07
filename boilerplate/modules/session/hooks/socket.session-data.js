/*jshint esnext: true */

module.exports = function(socket) {
    socket.emit("session-data", socket.handshake.session);
};