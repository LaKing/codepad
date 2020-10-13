/* js-beautify */

module.exports = function (socket) {
    socket.on("typohint", function (projectfile, callback) {
        if (!projectfile) projectfile = socket.projectfile;
        if (projectfile.charAt(0) !== "/") return console.error("Cannot typohint. Bad path.");
        if (!projectfile) return console.error("Cannot typohint. No parameter.");
        if (!ß.projectfiles[projectfile]) return console.error("Cannot typohint. No such projectfile: " + projectfile);
        if (!ß.projectfiles[projectfile].realpath) return console.error("Cannot typohint. No realpath for projectfile: " + projectfile);

        ß.lib.typohint.evaluate_file(projectfile);

        setTimeout(function () {
            socket.emit("typohint", ß.projectfiles[projectfile].typohint);
        }, 1000);
    });
};

/*
const EditorSocketIOServer = require(ß.get_module_path("ot") + "/editor-socketio-server.js");

module.exports = function(socket) {
    socket.on("beautify", function(projectfile, callback) {
        if (!projectfile) projectfile = socket.projectfile;
        if (projectfile.charAt(0) !== "/") return console.error("Cannot beautify. Bad path.");
        if (!projectfile) return console.error("Cannot beautify. No parameter.");
        if (!ß.projectfiles[projectfile]) return console.error("Cannot beautify. No such projectfile: " + f);
        if (!ß.projectfiles[projectfile].realpath) return console.error("Cannot beautify. No realpath for projectfile: " + f);

        var realpath = ß.projectfiles[projectfile].realpath;

        const options = {
            tabWidth: 4,
            semi: true,
            filepath: realpath,
            jsxBracketSameLine: true,
            printWidth: 180,
            proseWrap: "never"
        };

        try {
            var data = ß.prettier.format(ß.editor[realpath].document, options);
            //ß.lib.projectfiles.save(projectfile, data);
            //ß.editor[realpath].updateDocServerOperation(data);
          	// okay, instead of savingf it on the server side, we will send it to the client, and update the doc there.
          
            ß.lib.projectfiles.oplog(socket.username, "beautify prettier", socket.projectfile);
            ß.ntc(socket.username, "beautify prettier", socket.projectfile);
          	// we send it here in a callback
          	callback(null, data);
        } catch (err) {
            let msg = err.message.split("\n")[0];
            ß.lib.projectfiles.oplog(socket.username, "prettier error " + msg, socket.projectfile);
            ß.err("prettier error", realpath, "\n", err);
        }
    });
};
*/
