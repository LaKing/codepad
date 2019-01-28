/*ßoilerplate */

const lib = ß.lib;
const fs = ß.fs;
const express = ß.express;

// Basic includes
const util = require("util");
const https = require("https");

//const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const compression = require("compression");

// create our main express app, and share it in the bp object
const app = express();
app.use(compression());

if (!ß.app) ß.app = app;

if (ß.lib.settings) app.locals.settings = ß.lib.settings.readSync();

const httpsServer = https.createServer(ß.lib.server.load_credentials(), app);

ß.load("express");

if (ß.USE_PASSPORT) ß.load("passport");

app.use(bodyParser.json()); // get information from html forms
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// use this shorthand function for static routes
ß.static = function(path) {
    if (fs.isDir(path)) return ß.app.use(ß.express.static(path, ß.STATIC_OPTIONS));
    ß.error(path + " is not a directory");
};

app.set("view engine", "ejs"); // set up ejs for templating

if (ß.USE_SESSION) ß.run_hook("load_session");
if (ß.USE_SOCKETIO) ß.run_hook("load_socketio", httpsServer);

// load express routes
ß.load("routes");

// the index route should be last to allow altering req.url in previous routes
ß.load("index");

// catchall last route
let error404 = "<b>404 Not found. Sorry.</b>";
if (ß.ERROR404HTML) error404 = ß.ERROR404;
if (ß.ERROR404HTML !== false)
    ß.app.get("*", function(req, res) {
        res.set("Content-Type", "text/html");
        console.log("404-not-found req.url:", req.url, "req.originalUrl", req.originalUrl);
        res.status(404).end(error404);
    });

// express error handler route
let error500 = "<b>500 Internal server error. Sorry.</b>";
if (ß.ERROR500HTML) error500 = ß.ERROR500;
if (ß.ERROR500HTML !== false)
    ß.app.use(function(err, req, res, next) {
        res.set("Content-Type", "text/html");
        đ(err);
        //Ł("500-express-error-handler", req.originalUrl, err);
        if (ß.MODE === "production") res.status(500).end(error500);
        else res.status(500).end(error500 + "<pre>" + err.stack + "</pre>");
    });

var port = 443;
if (ß.PORT) port = ß.PORT;

httpsServer.listen(port, function(err) {
    // we dont need to wait for this in our ide anymore
    fs.removeSync(ß.VAR + "/await/await-https-server.pid");

    if (err) return ß.err("Server failed to start on the HTTPS port.");

    console.log("- Server is started on port", port, "mem usage:", process.memoryUsage().rss);
    if (ß.DEBUG) ß.ntc(ß.MODE + " Server (re)start DEBUG");
    else ß.ntc(ß.MODE + " Server (re)start");

    // in case any other app wants to consume it
    fs.writeFileSync(ß.VAR + "/https-server.port", port);
});

process.on("SIGTERM", function() {
    httpsServer.close(function() {
        console.log("Server closed via SIGTERM");
        process.exit(0);
    });
});

process.on("SIGUSR1", function() {
    httpsServer.close(function() {
        console.log("Server closed via SIGUSR1");
        process.exit(0);
    });
});
