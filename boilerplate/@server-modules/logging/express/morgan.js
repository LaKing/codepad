/*ßoilerplate */

/* @DOC

Logging via morgan logger. By default we trust the proxy, and log to `VAR` log folder to a file marked with the startup date and time.

*/

// logging formatter string for morgan
const morgan = require("morgan");
const format = ß.MORGAN_FORMAT || "[:date[clf]] :response-time ms :remote-addr :referrer :status :method :url";
const trust_proxy = ß.MORGAN_TRUST_PROXY || true;

var dir = ß.DATE;
var time = ß.TIME;

ß.fs.mkdirpSync(ß.VAR + "/log/" + dir);
const logfile = ß.MORGAN_LOGFILE || ß.VAR + "/log/" + dir + "/" + time + ".log";

if (trust_proxy) {
    ß.app.enable("trust proxy");
    ß.app.set("trust proxy", function() {
        return true;
    });
}

var accessLogStream = ß.fs.createWriteStream(logfile, {
    flags: "a"
});

console.log("- Morgan logging to " + logfile);

// setup the logger
ß.app.use(
    morgan(format, {
        stream: accessLogStream
    })
);
