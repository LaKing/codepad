/* js-beautify */

const EditorSocketIOServer = require(ß.get_module_path("ot") + "/editor-socketio-server.js");

/*      
JavaScript (including experimental features)
JSX
Angular
Vue
Flow
TypeScript
CSS, Less, and SCSS
HTML
JSON
GraphQL
Markdown, including GFM and MDX
YAML
*/

const extensions = "js vue ts css scss html json ms yaml yml graphql";

module.exports = function (socket) {
    socket.on("beautify", function (projectfile, callback) {
 
        if (!projectfile) projectfile = socket.projectfile;
        if (projectfile.charAt(0) !== "/") return console.error("Cannot beautify. Bad path.");
        if (!projectfile) return console.error("Cannot beautify. No parameter.");
        if (!ß.projectfiles[projectfile]) return console.error("Cannot beautify. No such projectfile: " + projectfile);
        if (!ß.projectfiles[projectfile].realpath) return console.error("Cannot beautify. No realpath for projectfile: " + projectfile);

        var realpath = ß.projectfiles[projectfile].realpath;

        const options = {
            tabWidth: 4,
            semi: true,
            filepath: realpath,
            jsxBracketSameLine: true,
            printWidth: 180,
            proseWrap: "never",
        };

        const ext = ß.path.extname(realpath).substring(1);

        if (extensions.split(" ").indexOf(ext) < 0) return;
        try {
            var data = ß.prettier.format(ß.editor[realpath].document, options);
            // okay, instead of savingf it on the server side, we will send it to the client, and update the doc there.
            ß.lib.projectfiles.oplog(socket.username, "beautify prettier", projectfile);
            ß.ntc(socket.username, "beautify prettier", projectfile);
            // we send it here in a callback
            callback(null, data);
        } catch (err) {
            let msg = err.message.split("\n")[0];
            ß.lib.projectfiles.oplog(socket.username, "prettier error " + msg, projectfile);
            ß.err("prettier error", realpath, "\n", err);
        }
    });
};
