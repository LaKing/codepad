/*jshint esnext: true */

const lib = ß.lib;
const fs = ß.fs;
const express = ß.express;
const mongoose = ß.mongoose;
const passport = ß.passport;

// Basic includes
const util = require('util');
const https = require('https');

//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

// create our main express app, and share it in the bp object
const app = express();
app.use(compression());

ß.app = app;

if (ß.lib.settings) app.locals.settings = ß.lib.settings.readSync();

const httpsServer = https.createServer(ß.lib.server.load_credentials(), app);

if (ß.USE_PASSPORT) ß.load('passport');

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// use this shorthand function for static routes
ß.static = function(path) {
    ß.app.use(ß.express.static(path, ß.static_options));
};

app.set('view engine', 'ejs'); // set up ejs for templating

if (ß.USE_SESSION) ß.run_hook('load_session');
if (ß.USE_SOCKETIO) ß.run_hook('load_socketio', httpsServer);

ß.load('routes');

var port = 443;
if (ß.port) port = ß.port;

httpsServer.listen(port, function(err) {
    if (err) ß.err("Server failed to start on the HTTPS port.");
    console.log('- Server is started on port 443, mem usage:', process.memoryUsage().rss);
    if (ß.DEBUG) ß.ntc("Server (re)start DEBUG");
    else ß.ntc("Server (re)start");
});

process.on('SIGTERM', function() {
    httpsServer.close(function() {
        console.log("Server closed via SIGTERM");
        process.exit(0);
    });
});

process.on('SIGUSR1', function() {
    httpsServer.close(function() {
        console.log("Server closed via SIGUSR1");
        process.exit(0);
    });
});