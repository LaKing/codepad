/* @DOC

The ß is
Unicode Character “ß” (U+00DF)
ASCII 225

On nix, Ctrl-Shift U00DF

However, you can also use the `$$$` as an alias to `ß`, it should refer to the same object.
*/

if (!global.ß) global.ß = {};
if (!global.$$$) global.$$$ = ß;

if (!ß.MODE) {
	if (process.env.NODE_ENV === "production") ß.MODE = "production";
	else ß.MODE = "development";
}


console.log("Starting ßoilerplate on node", process.versions.node, process.platform, ß.MODE, process.cwd());

require('./loader');

//ß.debug("- " + Object.keys(ß).length + " ß.keys defined");

ß.boot();

ß.load('init');
ß.load('server');
ß.load('start');

// background subprocesses may be defined in fork directories
//if (process.argv.indexOf("--restart-server") >= 0) ß.ntc("Skipping forks, restart-server");
//else 
ß.fork("fork");

// application started.
if (ß.DEBUG) {
    ß.load('debug');
    ß.debug_namespace();
}