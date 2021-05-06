const child_process = require("child_process");

function make_pty_runtime() {
    var command = "/usr/bin/node";
    var args = ["/usr/bin/npm", "install", "node-pty"];

    var options = {};
    options.cwd = ß.VAR + "/pty";
    options.stdio = ["pipe", process.stdout, process.stderr];

    ß.fs.emptydirSync(options.cwd);

    ß.ntc("Building node-pty");
    let result = child_process.spawnSync(command, args, options);
    if (result.status === 0) console.log("--- success ---");
    else console.log("--- failed ---");
}

/* @DOC

	pty.js / node-pty - requires to have nan built with node-gyp according to the current node version. 
    Therefore we build this in the var/pty folder - if not exists.

*/

const pty_dir = ß.VAR + "/pty/node_modules/node-pty";

if (!ß.fs.existsSync(pty_dir)) make_pty_runtime();

// now there must be a folder we can try - it may got utdated though
try {
    ß.pty = require(pty_dir);
} catch (err) {
    if (err) {
        ß.error("Error while loading pty", err);
        make_pty_runtime();
        try {
            ß.pty = require(pty_dir);
        } catch (fatal_err) {
            if (fatal_err) ß.error("Fatal Error while loading pty", fatal_err);
        }
    }
}
