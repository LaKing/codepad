/*ßoilerplate */

const express = ß.express;
const https = require("https");
const path = require("path");
const server = ß.socketio;
//const pty = require('pty.js');
const fs = ß.fs;
const os = require("os");
const URL = require("url").URL;

// I have dropped ssh, but keep it here for reference

// We need the id_rsa file
// We need the user to be able to connect
// - home dir
// - login shell
// - .profile file
// execute-right, 700 on .ssh folder
// read-right 600 on id_rsa

//let sshport = 22;
//let sshhost = "localhost";
//let sshauth = "publickey";
//let sshuser = "codepad";
var homedir = os.homedir();
//var id_file = homedir + "/.ssh/id_rsa";

ß.wio.on("connection", function (socket) {
    const request = socket.request;
    const req_url = new URL(request.headers.referer);
    const uri = req_url.pathname;
    const ip = socket.handshake.headers["x-forwarded-for"];
    const username = ß.lib.basicauth.username_by_socket(socket);

    ß.debug("+ wetty socket-connection " + socket.username + " ip:" + ip + " ", uri);

    let term;

    if (!ß.pty) return ß.err("No ß.pty");
    if (process.getuid() == 0) return ß.err("wetty shell: no terminal allowed when started as root");

    let ura = uri.split("/");
    let dir = ß.PROJECTDIR;
    let file;

    let cmd = "bash";
    let arg = [];

    // interpreter/command
    cmd = ura[1];

    // shell is opening midnight commander ...
    if (cmd === "shell") return exec(socket, ß.PROJECTDIR, "bash", []);

    // case for bash, node, php, whatever interpreter
    // ß.LANG_INTERPRETERS

    // calculate
    ura.splice(0, 2);
    file = ura.pop();
    dir = ß.PROJECTDIR + "/" + ura.join("/");

    // set the arguments
    arg.push(file);

    if (!file) return exec(socket, ß.PROJECTDIR, cmd, []);

    return fs.access(dir + "/" + file, fs.constants.F_OK, (err) => {
        if (err) return exec(socket, ß.PROJECTDIR, "bash", []);
        exec(socket, dir, cmd, arg);
    });

    //console.log('ssh ' + sshuser + '@' + sshhost + ' -p ' + sshport + ' -o  PreferredAuthentications=' + sshauth + ' -i ' + id_file);
    //term = ß.pty.spawn("ssh", [sshuser + "@" + sshhost, "-p", sshport, "-o", "PreferredAuthentications=" + sshauth, "-i", id_file], {
});

console.log("- shell available");

function exec(socket, dir, cmd, arg) {
    const username = ß.lib.basicauth.username_by_socket(socket);

    let filepath;
    if (arg[0]) filepath = "/" + arg[0];

    // (username, opname, filepath)
    ß.lib.projectfiles.oplog(username, cmd, filepath);
    ß.ntc(username + " [" + ß.path.basename(dir) + "] " + cmd + " " + arg.join(" "));

    let active = true;
	let env = process.env;
    env.USER = username;
    
    var term = ß.pty.spawn(cmd, arg, {
        name: "xterm-256color",
        cols: 80,
        rows: 30,
        cwd: dir,
        env: env
    });

    //console.log((new Date()) + " PID=" + term.pid + " STARTED on behalf of user=" + sshuser);
    term.on("data", function (data) {
        socket.emit("output", data);
    });

    term.on("exit", function (code) {
        term = undefined;
        //console.log((new Date()) + " PID=" + term.pid + " ENDED");
    });
    socket.on("resize", function (data) {
        if (!term) return;
        if (data.col < 1) return console.log("Wetty resize error, col:", data.col);
        if (data.row < 1) return console.log("Wetty resize error, row:", data.row);

        term.resize(data.col, data.row);
    });
    socket.on("input", function (data) {
        if (term) term.write(data);
    });
    socket.on("disconnect", function () {
        if (term) term.end();
        ß.debug("- wetty socket disconnect" + username);
    });
}


/*

BUG

nov 23 15:29:14 marton-devel node[48533]: marton [szamlazzhu] mc lib
nov 23 15:29:14 marton-devel node[48533]: marton [szamlazzhu] bash npm.sh
nov 23 15:29:14 marton-devel node[48533]: marton [szamlazzhu] bash npm.sh
nov 23 15:29:17 marton-devel node[48533]: marton [szamlazzhu] mc lib
nov 23 15:29:18 marton-devel node[48533]: marton [szamlazzhu] bash npm.sh
nov 23 15:29:36 marton-devel node[48533]: ┏━━━━━━━━━━━━━━━━━━━━━━━━━━ Exception Error ━━━━━━━━━━━━━━━━━━━━━━━━━━━
nov 23 15:29:36 marton-devel node[48533]: ┠────   resizing must be done using positive cols and rows
nov 23 15:29:36 marton-devel node[48533]: ┠─ Error: resizing must be done using positive cols and rows
nov 23 15:29:36 marton-devel node[48533]: ┠─     at UnixTerminal.resize (/var/codepad/var/pty/node_modules/node-pty/lib/unixTerminal.js:235:19)
nov 23 15:29:36 marton-devel node[48533]: ┠─     at Socket.<anonymous> (/usr/local/share/boilerplate/@codepad-modules/wetty/start/terminalprocess.js:112:24)
nov 23 15:29:36 marton-devel node[48533]: ┠─     at Socket.emit (events.js:315:20)
nov 23 15:29:36 marton-devel node[48533]: ┠─     at Socket.onevent (/usr/local/share/boilerplate/@server-modules/socketio/node_modules/socket.io/dist/socket.js:253:20)
nov 23 15:29:36 marton-devel node[48533]: ┠─     at Socket._onpacket (/usr/local/share/boilerplate/@server-modules/socketio/node_modules/socket.io/dist/socket.js:216:22)
nov 23 15:29:36 marton-devel node[48533]: ┠─     at /usr/local/share/boilerplate/@server-modules/socketio/node_modules/socket.io/dist/client.js:205:28
nov 23 15:29:36 marton-devel node[48533]: ┠─     at processTicksAndRejections (internal/process/task_queues.js:75:11)
nov 23 15:29:36 marton-devel node[48533]: ┗━━━━ EXITING with code 100


*/