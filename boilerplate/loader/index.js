/*ßoilerplate */
if (!global.ß) global.ß = {};
if (!ß.cli_commands) ß.cli_commands = [];

// load the loader libs
try {
  
  	// the order matters
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
	
    require("./boot.js");
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
  
  	// fallback function for multilinguial modules and projects without the multilanguage module.
    // ß.translate should always be defined.
  	if (!ß.translate) ß.translate = function(arg, data) {
     	return data; 
    };
  
} catch (err) {
    console.error(err);
    console.log("ERROR, EXITING due to a boot failure in the boilerplate-loader");
    process.exit(93);
}


// try to load the module list
try {
    ß.load_modules(ß.MRD);

    if (!ß.CLI) {
        let n = Object.keys(ß.modules).length;
        if (n < 1) ß.error("0 modules.");
        if (n == 1) ß.error("1 module only.");
        if (n <= 1) return ß.error("Check your installation. Module Root Directory (ß.MRD) is " + ß.MRD + " Did you uplink any modul stacks?");
    }

    ß.debug_modules();

} catch (err) {
    đ(err);
    console.log("ERROR, EXITING due to a failure in the boilerplate loader initialization");
    process.exit(94);
}