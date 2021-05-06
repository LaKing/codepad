/*ßoilerplate */

const session = require("express-session");
const sessionDB = ß.lib.session.config_mongodb();
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore(sessionDB);
const os = require("os");

var crypto = require('crypto');
// TODO find a better default secret
var rand = ß.NAME + Math.floor((Math.floor(new Date() /1000) - os.uptime())/100);
var hash = crypto.createHash('md5').update(rand).digest('hex');

// a custom secret is primary, 
if (!ß.secret) ß.ntc("Session handling in production shall have some unique presistent secret set. (ß.secret)");
const secret = ß.secret || hash;

// Catch errors
store.on("error", function(error) {
    console.log("ERROR in MongoDBStore", error);
});

// see https://github.com/expressjs/session
// @DOC It is possible to access the session store via `ß.session_store`
ß.session_store = store;

module.exports = function() {
    // When the cookie maxAge is defined, express sessions are presistent across browser restarts.
    var session_days = 365;
    if (ß.app.locals.settings.session_days) session_days = ß.app.locals.settings.session_days;

    ß.sessionMiddleware = session({
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * session_days,
            secure: true
        },
        name: "app",
        secret: secret,
        store: store,
        proxy: true,
        resave: true,
        saveUninitialized: true,
        maxAge: 60 * 60 * 1000
    });
  
    ß.app.use(ß.sessionMiddleware);

    if (ß.passport) ß.app.use(ß.passport.initialize());
    if (ß.passport) ß.app.use(ß.passport.session()); // persistent login sessions
};
