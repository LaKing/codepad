/*ßoilerplate */

const fs = ß.fs;

// Basic includes
const util = require("util");
const https = require("https");

if (!ß.app) return ß.error('No main ß.app for server.');

// used to inicialize middleware, like express-session
ß.run_hook("load_app");

// express middlewares
ß.load("express");

// load express routes, they eventuall call next();
ß.load("pre-routes");

// load all routes for app, admin, api, ...
ß.load("routes");

// load the routers that are set up by now, admin, api, ...
ß.load("post-routes");

// set language-based index.html
ß.load("pre-index");

// serve application frontend entry points, index.htm, admin.htm, ...
ß.load("index");

// if nothing got served, serve error messages, 404, 500 ...
ß.load("post-index");

// @DOC The `server` module uses express as https server
const httpsServer = https.createServer(ß.lib.server.load_credentials(), ß.app);

// we use this special hook for socket.io, that needs to recieve the httpsServer
ß.run_hook("load_server", httpsServer);

var port = 443;
if (ß.PORT) port = ß.PORT;

httpsServer.listen(port, function(err) {
    // we dont need to wait for this in our ide anymore
    fs.remove(ß.VAR + "/await/await-https-server.pid", rm_err => {
        if (rm_err) return console.error(rm_err);
    });
  
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
