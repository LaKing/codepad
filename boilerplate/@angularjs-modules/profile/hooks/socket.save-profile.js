/*ßoilerplate */

const fs = require('fs');

module.exports = function(socket) {

    socket.on("save-profile", function(data) {
        socket.get_user(function(user) {

            if (data.profile)
                user.profile = data.profile;

            if (data.billing)
                user.billing = data.billing;

            if (data.shipping)
                user.shipping = data.shipping;

            user.save(function(err) {
                if (err) return console.log(err);
                if (data.profile)
                    user.updateLocal(data.profile.email, data.profile.password);

                ß.lib.session.update_user(socket.handshake.session, user);
                socket.emit('session-data', socket.handshake.session);

                socket.emit("success", "Profil saved");
            });
        });
    });
};