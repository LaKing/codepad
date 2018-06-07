/*jshint esnext: true */

const lib = ß.lib;

module.exports = function(session, user) {
    const app = ß.app;
    if (!session) return console.error("ERROR @session.lib.update_user - !session ?");

    // Depending on your application, we might want to sync current session with the user
    ß.run_hooks("session_update_user", session, user);
};

// DO NOT CALL session.save() here, or in any of the hooks.
// It will cause a bug. session.passport.user will be wiped out, along with other variables ...