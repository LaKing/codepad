/*ßoilerplate */

/* @DOC

	You can start the boilerplate command line with the shell command `ß`, once it is installed and the file `/bin/ß` exists - eventually as a symlink.
    The cli version has it's own options, calling it without arguments will display those options.
	The basic commads are
`
ß install
ß start
ß stop
ß debug
`

Note that a running instance needs to be stopped before another instance can be created.

Modules may define its own cli commands.

*/

if (!global.ß) global.ß = {};

ß.CLI = true;

ß.CMD = process.argv[2];
ß.ARG = process.argv[3];
ß.OPA = process.argv[4];

//console.log('cli-command: ß ' + ß.CMD + ' ' + ß.ARG);

if (ß.CMD === "debug") ß.DEBUG = true;

require("./loader");

// @DOC after processing the loader, if the file cli.js exists in the CWD it will be loaded as well.
if (ß.fs.existsSync(ß.CWD + "/cli.js")) require(ß.CWD + "/cli.js");

ß.msg("cli-command: ß " + (ß.CMD || "") + " " + (ß.ARG || ""));

// add definitions for commands in folders
ß.load("cli");

ß.cli_commands.push("install   # start installation / upgrade of systemwide packages and node_modules required by the current selection of modules");
ß.cli_commands.push("start     # start the boilerplate application in a systemd scope");
ß.cli_commands.push("stop      # terminate all systemd scopes running the boilerplate application");
ß.cli_commands.push("debug     # start in verbose debug mode");

ß.cli_commands.push("");

if (ß.CMD === "start" || ß.CMD === "debug") {
  if (ß.fs.existsSync(ß.CWD + "/server.js")) return require(ß.CWD + "/server.js");
  if (ß.fs.existsSync("./index.js")) return require("./index.js");
  console.log('Culd not find an entry point for starting the boilerplate.');
  process.exit();
  return;
}

if (ß.CMD === "install") {
    ß.exec("dnf.sh");
    ß.exec("install.sh");
    ß.exec("npm.sh");
    process.exit();
    return;
}

/// DEBUG
if (ß.CMD === "goodfork") {
    ß.msg("fork");
    ß.fork_file("/srv/codepad-project/var/vue/node_modules/webpack-dev-server/validate.js");
    //ß.fork_file("/srv/codepad-project/@vue-modules/vue/fork/vue-serve.js");

    process.exit();
    return;
}

// DEBUG 
if (ß.CMD === "badfork") {
    ß.msg("fork");
    //ß.fork_file("/srv/codepad-project/var/vue/node_modules/webpack-dev-server/validate.js");
    ß.fork_file("/srv/codepad-project/@vue-modules/vue/fork/vue-serve.js");

    process.exit();
    return;
}
// ß stop && ß badfork && sleep 3 && cat /srv/codepad-project/var/debug/fork-vue-serve.stdout.log



// @DOC `ß uplink` will create folders with symlinks to use modules. This is a helper for application stack initialization.
ß.cli_uplink();

ß.cli_commands.push("");
ß.cli_commands.push("lib FN [ARG]    # Execute a boilerplate function with one argument");
if (ß.CMD === "lib") {
    ß.DEBUG = true;
	if (!ß.ARG) return ß.err("No boilerplate-function argument for the exec-function command.");
  	ß.boot();
  	ß.msg("Execute lib function " + ß.ARG + "(" + ß.OPA + ")");
  	
  	//Ł(ß.lib.drive_list);
  	if (ß.ARG.indexOf('.')>0)
    {
  		var arga = ß.ARG.split('.');	
  		var module = arga[0];
      	var fnname = arga[1];
  		
      	if (typeof ß.lib[module][fnname] === 'function') 
          if (ß.OPA) ß.lib[module][fnname](ß.OPA);
      	  else ß.lib[module][fnname]();
  		else ß.err("ß.lib." + ß.ARG + " is not a ß function.");
      
        process.exit();
 		return;

    } else {

    	if (typeof ß.lib[ß.ARG] === 'function')  
          if (ß.OPA) ß.lib[ß.ARG](ß.OPA);
      	  else ß.lib[ß.ARG]();
		else ß.err("ß.lib." + ß.ARG + " is not a ß function.");

    }
    process.exit();
 	return;
}

ß.cli_commands.push("restart-server		# restart the server process");
ß.cli_commands.push("");

ß.notice("- CLI-command:", ß.CMD || '?', ß.ARG || '');
if (ß.CMD !== 'help') ß.error("no command / invalid command");

ß.notice("=== CLI commands ===");
for (let i = 0; i < ß.cli_commands.length; i++) ß.notice(ß.cli_commands[i]);

process.exit();
