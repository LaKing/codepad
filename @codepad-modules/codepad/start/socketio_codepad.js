/*ßoilerplate */

const fs = require("fs");
const URL = require("url").URL;

const app = ß.app;
const User = ß.User;
const lib = ß.lib;

function add_socket_functions(socket, namespace) {
    const ip = socket.handshake.headers["x-forwarded-for"];
    const uri = new URL(socket.handshake.headers.referer).pathname;
    socket.username = ß.lib.basicauth.username_by_socket(socket);

    ß.debug("+ " + namespace + " socket connection " + socket.username + " " + uri);

    socket.on("log", function(msg) {
        console.log(msg);
    });
    socket.on("Ł", function(msg) {
        Ł(msg);
    });

    //ß.run_hook("socket", socket);

    ß.run_hook(namespace + "_socket", socket);

    socket.on("disconnect", function() {
        ß.debug("- " + namespace + " socket disconnect " + socket.username + " " + uri);
    });
}

const main_io = ß.io.of("/main");
main_io.on("connection", function(socket) {
    add_socket_functions(socket, "main");
  	    socket.REGISTERED = 'main';
});

const pad_io = ß.io.of("/p");
pad_io.on("connection", function(socket) {
    socket.projectfile = ß.lib.pad.projectfile_by_socket(socket);
    add_socket_functions(socket, "pad");
  	    socket.REGISTERED = 'pad';

});

const log_io = ß.io.of("/log");
log_io.on("connection", function(socket) {
    add_socket_functions(socket, "log");
    ß.run_hook("log_socket", socket);
  	    socket.REGISTERED = 'log';

});

ß.io.on("connection", function(socket) {
});