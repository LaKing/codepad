/*ßoilerplate */

const fs = require('fs');
const URL = require('url').URL;

const app = ß.app;
const io = ß.io;
const User = ß.User;
const lib = ß.lib;


io.on('connection', function(socket) {

    var ip = socket.handshake.headers['x-forwarded-for'];
    var uri = new URL(socket.handshake.headers.referer).pathname;
    socket.username = ß.lib.username_by_socket(socket);

    console.log('+ socket-connection ' + socket.username + ' ip:' + ip + ' ', uri);

    if (uri.substring(0, 3) === '/p/') socket.projectfile = uri.substring(2);
    if (uri.substring(0, 6) === '/files') socket.files_socket = true;
    if (uri.substring(0, 6) === '/') socket.files_socket = true;
    if (uri.substring(0, 6) === '/') socket.main_socket = true;
    if (uri.substring(0, 6) === '/logs') socket.logs_socket = true;

    socket.on('log', function(msg) {
        console.log(msg);
    });

    socket.on('Ł', function(msg) {
        Ł(msg);
    });

    ß.run_hook('socket', socket);

    socket.on('disconnect', function() {
        console.log('- socket-disconnect ' + socket.username + ' ip:' + ip + ' ', uri);
    });

});
