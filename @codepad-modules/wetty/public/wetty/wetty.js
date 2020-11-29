var term;
var socket = io(location.origin, {
    path: "/wetty/socket.io",
});

// we nedd a buffer so that we can catch incoming data even if there is no instance of the dispay
var buf = "";

function Wetty(argv) {
    this.argv_ = argv;
    this.io = null;
    this.pid_ = -1;
}

Wetty.prototype.run = function () {
    this.io = this.argv_.io.push();

    this.io.onVTKeystroke = this.sendString_.bind(this);
    this.io.sendString = this.sendString_.bind(this);
    this.io.onTerminalResize = this.onTerminalResize.bind(this);
};

Wetty.prototype.sendString_ = function (str) {
    socket.emit("input", str);
};

Wetty.prototype.onTerminalResize = function (col, row) {
    socket.emit("resize", {
        col: col,
        row: row,
    });
};

socket.on("connect", function () {
    lib.init(function () {
        hterm.defaultStorage = new lib.Storage.Local();
        term = new hterm.Terminal();
        window.term = term;
        term.decorate(document.getElementById("terminal"));

        term.setCursorPosition(0, 0);
        term.setCursorVisible(true);
        term.prefs_.set("ctrl-c-copy", true);
        term.prefs_.set("ctrl-v-paste", true);
        term.prefs_.set("use-default-window-copy", true);

        term.runCommandClass(Wetty, document.location.hash.substr(1));

        if (buf && buf != "") {
            term.io.writeUTF16(buf);
            buf = "";
        }

        socket.emit("init");
    });
});

socket.on("output", function (data) {
    if (!term) return (buf += data);
    term.io.writeUTF16(data);
});

socket.on("exit-code", function (code, callback) {
    if (code === 0) code += " OK!";
    else code += " ERROR! ";
    if (!term) return (buf += " EXIT " + code);
    term.io.writeUTF16("# EXIT " + code);
    callback();
});

socket.on("disconnect", function () {
    if (!term) return (buf += " .. DISCONNECTED");
    term.io.writeUTF16(" .. DISCONNECTED");
    // location.reload();
});
