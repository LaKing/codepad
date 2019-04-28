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
//console.log('cli-command: ß ' + ß.CMD + ' ' + ß.ARG);

if (ß.CMD === "debug") ß.DEBUG = true;

require("./loader");

// @DOC after processing the loader, if the file cli.js exists in the CWD it will be loaded as well.
if (ß.fs.existsSync(ß.CWD + "/cli.js")) require(ß.CWD + "/cli.js");

ß.msg("cli-command: ß " + (ß.CMD || "") + " " + (ß.ARG || ""));

// add definitions for commands in folders
ß.load("cli");

ß.cli_commands.push("install");
ß.cli_commands.push("start");
ß.cli_commands.push("stop");
ß.cli_commands.push("debug");

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

// @DOC `ß uplink` will create folders with symlinks to use modules. This is a helper for application stack initialization.
ß.cli_uplink();

ß.notice("- CLI-command:", ß.CMD || '?', ß.ARG || '');
if (ß.CMD !== 'help') ß.error("no command / invalid command");

ß.notice("=== CLI commands ===");
for (let i = 0; i < ß.cli_commands.length; i++) ß.notice(ß.cli_commands[i]);

process.exit();
