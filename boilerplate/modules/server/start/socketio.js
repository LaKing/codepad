/*jshint esnext: true */
const fs = require('fs');
//const User = require('./user-model');
//const admin = require('./admin.js');

const URL = require('url').URL;

function get_socket_user(socket) {

    if (!socket) return console.log('Missing socket?');
    if (!socket.handshake) return console.log('Mising handshake?');
    if (!socket.handshake.session) return console.log('Missing session?');
    if (!socket.handshake.session.passport) return console.log('Missing session.passport.');
    if (!socket.handshake.session.passport.user) return console.log('Missing session.passport.user?');

    return true;
}

const app = ß.app;
const io = ß.io;
const User = ß.User;
const session = ß.session;
const lib = ß.lib;

//const ss = require('socket.io-stream');

//const promo = require('./promo.js')(app, io);

io.on('connection', function(socket) {

    var ip = socket.handshake.headers['x-forwarded-for'];
    var uri = new URL(socket.handshake.headers.referer).pathname;

    console.log('+ socket-connection ' + socket.handshake.session.username + ' ip:' + ip + ' ', uri);

    if (uri.substring(0, 3) === '/p/') socket.projectfile = uri.substring(2);
    if (uri.substring(0, 6) === '/files') socket.files_socket = true;
    if (uri.substring(0, 6) === '/') socket.files_socket = true;
    if (uri.substring(0, 6) === '/') socket.main_socket = true;
    if (uri.substring(0, 6) === '/logs') socket.logs_socket = true;


    socket.username = socket.handshake.session.username;

    socket.on('log', function(msg) {
        console.log(msg);
    });

    socket.on('Ł', function(msg) {
        Ł(msg);
    });

    ß.run_hooks('socket', socket);

    socket.on('disconnect', function() {
        console.log('- socket-disconnect ' + socket.handshake.session.username + ' ip:' + ip + ' ', uri);
    });

});
