/*jshint esnext: true */

console.log("Starting codepad");

require('./global');

ß.load('init');

ß.load('server');

ß.load('start');

// application started.
if (ß.DEBUG) ß.load('debug');