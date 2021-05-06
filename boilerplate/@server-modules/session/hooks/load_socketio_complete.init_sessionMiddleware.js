/*ßoilerplate */

const sharedsession = require("express-socket.io-session");

module.exports = function() {
	ß.io.use(sharedsession(ß.sessionMiddleware, {
        autoSave: true
    }));
};