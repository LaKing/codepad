/*ßoilerplate */

module.exports = function(session, user) {
    const app = ß.app;
    if (!session) return console.error("ERROR @session.lib.update_user - no session ?");

    session.user = user;

  	// TODO better in passport module and a hook?
    if (session.user.profile)
        if (!session.user.profile.email) {
            if (user.local.email) session.user.profile.email = user.local.email;
        }

    // Depending on your application, we might want to sync current session with the user
    ß.run_hook("session_update_user", session, user);
};

// DO NOT CALL session.save() here, or in any of the hooks.
// It will cause a bug. session.passport.user will be wiped out, along with other variables ...
