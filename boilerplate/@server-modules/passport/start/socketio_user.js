// this module requires session

if (!ß.io) return "Missing socket.io object";

const fs = ß.fs;
function get_socket_user(socket) {
    if (!socket) return console.log("Missing socket?");
    if (!socket.handshake) return console.log("Mising handshake?");
    if (!socket.handshake.session) return console.log("Missing session?");
    if (!socket.handshake.session.passport) return console.log("Missing session.passport.");
    if (!socket.handshake.session.passport.user) return console.log("Missing session.passport.user?");

    return true;
}

const app = ß.app;
const io = ß.io;
const User = ß.User;
const session = ß.session;
const lib = ß.lib;

io.on("connection", function(socket) {
    // restrtict socket connections to logged in users
    if (get_socket_user(socket) !== true) {
        socket.emit("message", "Please log in first.");
        console.log("@server start socket - abort at connection, no session");
        return;
    }

    var dir = socket.handshake.headers.referer.split("/")[3];
  	
    // assuming you are behind a reverse proxy
    var ip = socket.handshake.headers["x-forwarded-for"]; // || socket.handshake.connection.remoteAddress;
    const id = socket.handshake.session.passport.user;

    if (id === undefined) return console.log("! ERROR @ server/start/socketio.js connect - ID UNDEFINED", ip);

    User.findById(id, function(err, user) {
        if (err) return console.log(err);
        if (!user) return console.log("ERROR user could not be located for ", id);

        if (ß.USE_SESSION) {
            lib.session.update_user(socket.handshake.session, user);
            socket.handshake.session.save();
        }

        var email = "unknown";

        if (user.local) if (user.local.email) email = user.local.email;
        if (socket.handshake.session.is_admin) console.log("+ admin-connected ", email, " (id " + id + " ) ip:" + ip + " ", socket.handshake.headers.referer);
        else console.log("+ user-connected ", email, " (id " + id + ") ip:" + ip + " ", socket.handshake.headers.referer);

        socket.user_id = id;

        socket.get_user = function get_user(callback) {
            ß.User.findById(id, function(err, user) {
                if (err) {
                    socket.emit("danger", "ERROR");
                    console.log("ERROR in get_user.", err);
                    return callback(err, null);
                }
                if (!user) {
                    socket.emit("danger", "ERROR");
                    console.log("ERROR get_user could not locate user for ", id);
                    return callback(err, null);
                }
                try {
                    callback(err, user);
                } catch (error) {
                    Đ(error);
                    throw error;
                }
            });
        };

        socket.on("log", function(msg) {
            console.log(msg);
        });

        socket.on("Ł", function(msg) {
            Ł(msg);
        });
		
      	// This is the most important part of this block, run socket.label.js files in all hooks folders, containing socket.on stuff.
        ß.run_hook("socket", socket);

        if (!socket.handshake.session.is_admin) return;

        ß.run_hook("adminsocket", socket);
    });
});
