/*jshint esnext: true */

console.log("Starting codepad on node", process.versions.node, process.platform);

require('./global');

ß.load('init');

ß.load('server');

ß.load('start');

// application started.
if (ß.DEBUG) ß.load('debug');