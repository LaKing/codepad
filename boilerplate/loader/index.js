/*ßoilerplate */
if (!global.ß) global.ß = {};
if (!ß.cli_commands) ß.cli_commands = [];

// load the loader libs
try {
    require("./es2017.js");
  
    require("./fs.js");
    require("./node_modules.js");
    require("./init.js");

    require("./now.js");
    require("./pid.js");

    require("./lablib.js");
    require("./logger.js");
    require("./det.js");
    require("./process.js");

    require("./bp.js");
    require("./load.js");
    require("./spawn.js");
    require("./exec.js");
    require("./fork.js");
    require("./symlink.js");
    require("./modulelib.js");

    if (ß.CLI) require("./clilib.js");

    require("./lib.js");
    require("./hook.js");

    require("./modules.js");
} catch (err) {
    console.error(err);
    console.log("ERROR, EXITING due to a failure in the boilerplate-loader");
    process.exit(93);
}

// run the loader tasks
try {
    ß.load_modules(ß.MRD);

    if (!ß.CLI) {
        let n = Object.keys(ß.modules).length;
        if (n < 1) ß.error("0 modules.");
        if (n == 1) ß.error("1 module only.");
        if (n <= 1) return ß.error("Check your installation. Module Root Directory (ß.MRD) is " + ß.MRD);
    }

    ß.debug_modules();

    // @DOC The `/global` folder in a module should contain simple scripts to attach values to the global `ß` namespace.
    ß.load("global");

    // @DOC After the global `ß` values are set, libs and hooks are loaded.
    ß.load_lib(ß.modules);
    ß.load_hooks();

} catch (err) {
    đ(err);
    console.log("ERROR, EXITING due to a failure in the boilerplate initialization");
    process.exit(95);
}

//ß.debug("- " + Object.keys(ß).length + " ß.keys defined");
