/*ßoilerplate */

// @DOC The `post-login.json` request is responsible to log users in via email, password, and rem payload.

ß.app.post("/post-login.json", function(req, res, next) {

    // presistent logins
    if (req.body.rem) {
        var session_days = 365;
        if (ß.app.locals.settings.session_days) session_days = ß.app.locals.settings.session_days;
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * session_days;
        // else less presistent login sessions
    } else req.session.cookie.expires = false;

    ß.lib.passport.login(req, res, next);
});
