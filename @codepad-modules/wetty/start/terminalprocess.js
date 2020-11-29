/*ßoilerplate */

const express = ß.express;
const https = require("https");
const path = require("path");
const server = ß.socketio;

const fs = ß.fs;
const os = require("os");
const URL = require("url").URL;

var homedir = os.homedir();

ß.wio.on("connection", function (socket) {
    const request = socket.request;
    const req_url = new URL(request.headers.referer);
    const uri = req_url.pathname;
    const ip = socket.handshake.headers["x-forwarded-for"];
    const username = ß.lib.basicauth.username_by_socket(socket);

    ß.msg("+ wetty socket-connection " + username + " ip:" + ip + " ", uri);

    if (!ß.pty) return ß.err("No ß.pty");
    if (process.getuid() == 0) return ß.err("wetty shell: no terminal allowed when started as root");

    socket.on("init", function () {
        let ura = uri.split("/");
        let dir = ß.PROJECTDIR;
        let file;

        let cmd = "bash";
        let arg = [];

        // interpreter/command
        cmd = ura[1];

        // shell is opening midnight commander ...
        if (cmd === "shell") return exec(socket, ß.PROJECTDIR, "bash", []);

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
    });
});

console.log("- shell available");

function exec(socket, dir, cmd, arg) {
    const username = ß.lib.basicauth.username_by_socket(socket);

    let filepath;
    if (arg[0]) filepath = "/" + arg[0];

    // (username, opname, filepath)
    ß.lib.projectfiles.oplog(username, cmd, filepath);
    ß.ntc(" [" + username + "@" + ß.HOSTNAME.split(".")[0] + " " + ß.path.basename(dir) + "]# " + cmd + " " + arg.join(" "));

    let active = true;
    let env = process.env;
    env.USER = username;

    var term = ß.pty.spawn(cmd, arg, {
        name: "xterm-256color",
        cols: 80,
        rows: 30,
        cwd: dir,
        env: env,
    });

    //console.log((new Date()) + " PID=" + term.pid + " STARTED on behalf of user=" + sshuser);
    term.on("data", function (data) {
        socket.emit("output", data);
    });

    term.on("exit", function (code) {
        ß.debug("- terminal EXIT " + code + " from #" + cmd + " " + arg.join(" "));

        socket.emit("exit-code", code, function () {
            socket.disconnect();
        });
        term = undefined;
    });

    socket.on("resize", function (data) {
        if (!term) return;
        // resizing must be done using positive cols and rows
        if (data.col < 1) return console.log("Wetty resize error, col:", data.col);
        if (data.row < 1) return console.log("Wetty resize error, row:", data.row);

        term.resize(data.col, data.row);
    });
    socket.on("input", function (data) {
        if (term) term.write(data);
    });
    socket.on("disconnect", function () {
        if (term) term.end();
        ß.debug("- wetty socket disconnect " + username);
    });
}
