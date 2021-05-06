
// Middleware to make sure req.session.lang exists
if (ß.USE_SESSION)
    ß.app.use(function(req, res, next) {
        if (req.session.lang) return next();
        // get language variable if not exists
        req.session.lang = ß.lib.multilanguage.lang(req);
        next();
    });
