// watch file changes on the server
if (ß.server_watch === false || ß.server_watch === true) {
    console.log("- Server-side file watching is " +  ß.server_watch);
} else ß.server_watch = true;

ß.chokidar = require("chokidar");

let options = {};
options.cwd = ß.PROJECTDIR;
options.ignored = ['**/*.pem', '.git', '**/node_modules/**', 'node_modules/**', '.git/**'];

if (ß.server_watch) ß.projectdir_watch = ß.chokidar.watch(ß.PROJECTDIR, options);
