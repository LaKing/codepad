/*ßoilerplate */

module.exports = function(httpsServer) {

    // https://github.com/socketio/socket.io/issues/2945
    const io = require('socket.io')(httpsServer, {
        wsEngine: 'ws'
    });
    ß.io = io;

    process.on('SIGTERM', function() {
        if (ß.io)
            Object.keys(ß.io.sockets.sockets).forEach(function(s) {
                ß.io.sockets.sockets[s].disconnect(true);
            });

    });

    process.on('SIGUSR1', function() {
        if (ß.io)
            Object.keys(ß.io.sockets.sockets).forEach(function(s) {
                ß.io.sockets.sockets[s].disconnect(true);
            });

    });
  
    ß.run_hook('load_socketio_complete');

};