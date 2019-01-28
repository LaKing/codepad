/* js-beautify */

const EditorSocketIOServer = require(ß.get_module_path("ot") + "/editor-socketio-server.js");

module.exports = function(socket) {
    socket.on("beautify", function(f) {
      	if (f.charAt(0) !== '/') return;
        if (!f) f = socket.projectfile;
        if (!ß.projectfiles[f]) return console.error("Cannot beautify. No such projectfile: " + f);
        if (!ß.projectfiles[f].realpath) return console.error("Cannot beautify. No realpath for projectfile: " + f);

        var realpath = ß.projectfiles[f].realpath;

        var ext = f
            .split(".")
            .pop()
            .toLowerCase();

        //if (ext === 'js' || ext === 'ts' || ext === 'css' || ext === 'html' || ext === 'vue') {

        try {
            let options = {
                tabWidth: 4,
                semi: true,
                filepath: realpath,
                jsxBracketSameLine: true,
                printWidth: 180,
                proseWrap: "never"
            };
            var data = ß.prettier.format(ß.editor[realpath].document, options);
            ß.lib.projectfiles.save(f, data);
            ß.editor[realpath].updateDocServerOperation(data);
            ß.lib.projectfiles.oplog(socket.username, "beautify prettier", socket.projectfile);
        } catch (err) {
            let msg = err.message.split("\n")[0];
            ß.lib.projectfiles.oplog(socket.username, "prettier error " + msg, socket.projectfile);
            console.log("prettier error", realpath, "\n", err);
        }

        //} else ß.lib.projectfiles.oplog(socket.username, 'cannot beautify ' + ext, socket.projectfile);
    });
};

/* js-beautify */
/*
const EditorSocketIOServer = require(ß.get_module_path('ot') + '/editor-socketio-server.js');

module.exports = function(socket) {
	
    socket.on('beautify', function(f) {
		
        if (!f) f = socket.projectfile;
        if (!ß.projectfiles[f]) return console.error("Cannot beautify. No such projectfile: " + f);
      	if (!ß.projectfiles[f].realpath) return console.error("Cannot beautify. No realpath for projectfile: " + f);
      
        var realpath = ß.projectfiles[f].realpath;

        var ext = f.split('.').pop().toLowerCase();

        if (ext === 'js' || ext === 'css' || ext === 'html' || ext === 'vue') {
			if (ext === 'vue') ext = 'html';
            var data = ß.beautify[ext](ß.editor[realpath].document);
            ß.lib.projectfiles.save(f, data);
            ß.editor[realpath].updateDocServerOperation(data);
            ß.lib.projectfiles.oplog(socket.username, 'beautify-' + ext, socket.projectfile);

        } else ß.lib.projectfiles.oplog(socket.username, 'cannot beautify ' + ext, socket.projectfile);

    });

};
*/
