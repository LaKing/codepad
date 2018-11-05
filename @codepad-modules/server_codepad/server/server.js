/*jshint esnext: true */

const lib = ß.lib;
const fs = ß.fs;
const express = ß.express;
const mongoose = ß.mongoose;
const passport = ß.passport;
const session = ß.session;

// Basic includes
const util = require('util');
const os = require('os');
const https = require('https');

//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const secret = os.networkInterfaces().host0[0].mac;

var privateKey = fs.readFileSync(__dirname.substring(0, __dirname.lastIndexOf('/')) + '/cert/localhost.key', 'utf8');
var certificate = fs.readFileSync(__dirname.substring(0, __dirname.lastIndexOf('/')) + '/cert/localhost.crt', 'utf8');

// https certificate stuff
if (fs.existsSync(ß.CWD + '/localhost.key') && fs.existsSync(ß.CWD + '/localhost.crt')) {
    console.log("- using certificate from project");
    privateKey = fs.readFileSync(ß.CWD + '/localhost.key', 'utf8');
    certificate = fs.readFileSync(ß.CWD + '/localhost.crt', 'utf8');
}

const credentials = {
    key: privateKey,
    cert: certificate
};

// create our main express app, and share it in the bp object
const app = express();
ß.app = app;

if (ß.lib.settings) app.locals.settings = ß.lib.settings.readSync();

//const passportDB = lib.passport.config_mongodb(); //require('./app/database.js');
const httpsServer = https.createServer(credentials, app);

if (ß.passport) ß.load('passport');

//app.use(cookieParser()); // read cookies (needed for auth) // tryeed alaso with secret in argument
// since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work. 

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs'); // set up ejs for templating

// -- removed session

// https://github.com/socketio/socket.io/issues/2945
const io = require('socket.io')(httpsServer, {
    wsEngine: 'ws'
});
ß.io = io;

// -- removed session

ß.load('routes');

var port = 9001;
if (ß.port) port = ß.port;

httpsServer.listen(port, function(err) {
    if (err) ß.err("Server failed to start on the HTTPS port.");
    console.log('- Server is started on port ' + port + ', mem usage:', process.memoryUsage().rss);
    if (ß.DEBUG) ß.ntc("Server (re)start DEBUG");
    else ß.ntc("Server (re)start");
});

ß.httpsServer = httpsServer;

process.on('SIGTERM', function() {
    if (ß.io)
        Object.keys(ß.io.sockets.sockets).forEach(function(s) {
            var socket = ß.io.sockets.sockets[s];
            console.log("-- disconnecting socket", socket.username, socket.projectfile);
            socket.disconnect(true);
        });


    httpsServer.close(function() {
        console.log("Server closed via SIGTERM");
        process.exit(0);
    });
});

process.on('SIGUSR1', function() {
    if (ß.io)
        Object.keys(ß.io.sockets.sockets).forEach(function(s) {
            var socket = ß.io.sockets.sockets[s];
            console.log("-- disconnecting socket", socket.username, socket.projectfile);
            socket.disconnect(true);
        });

    httpsServer.close(function() {
        console.log("Server closed via SIGUSR1");
        process.exit(0);
    });

});
