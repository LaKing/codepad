// We already have a module list, we can start loading modules.
// ß.boot() will run the loader tasks

// TODO - where should we try and catch, where should we leave free flow?

ß.boot = function() {
  	ß.debug('- Booting the boilerplate modules.');
    try {
        // @DOC The `/global` folder in a module should contain simple scripts to attach values to the global `ß` namespace.
        ß.load("global");
        // @DOC The `/local` may contain pre-defined code which is loaded before libs are loaded. Factory should not have any local folder, it is project-specific code.
		ß.load("local");
        // @DOC After the global `ß` values are set, libs and hooks are loaded.
        ß.load_logic(ß.modules);
        ß.load_lib(ß.modules);
        ß.load_hooks(ß.modules);
      	ß.load_chains(ß.modules);
    } catch (err) {
        đ(err);
        console.log("ERROR, EXITING due to a failure in the boilerplate bootup initialization");
        process.exit(95);
    }
};
