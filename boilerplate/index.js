/*ßoilerplate */

if (!global.ß) global.ß = {};

if (!ß.MODE) {
	if (process.env.NODE_ENV === "production") ß.MODE = "production";
	else ß.MODE = "development";
}

console.log("Starting ßoilerplate on node", process.versions.node, process.platform, ß.MODE, process.cwd());

require('./loader');

ß.load('init');
ß.load('server');
ß.load('start');

// background subprocesses may be defined in fork directories
ß.fork("fork");

// application started.
if (ß.DEBUG) {
    ß.load('debug');
    ß.debug_namespace();
}