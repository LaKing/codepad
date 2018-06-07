/*jshint esnext: true */

if (!global.ß) global.ß = {};

ß.cli = true;

ß.CMD = process.argv[2] || '';
ß.ARG = process.argv[3] || '';

if (ß.CMD.toLowerCase() === 'debug') ß.DEBUG = true;

require('./global');

// process.argv
// [ '/usr/bin/node', '/srv/codepad-project/boilerplate/cli.js' ]
    
ß.ntc("- CLI-command:", ß.CMD, ß.ARG);

ß.load('cli');

ß.cli_commands.push('start');
ß.cli_commands.push('debug');

if (ß.CMD === 'start' || ß.CMD === 'debug') return require('./index.js');

ß.err("no command / invalid command");

ß.ntc('=== CLI commands ===');
for (let i=0; i<ß.cli_commands.length; i++) ß.ntc(ß.cli_commands[i]);

process.exit();


