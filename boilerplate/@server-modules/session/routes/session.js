// EXPRESS requests

// @DOC The session data can be accessed by the frontend on the `session.json` uri.

ß.app.all("/session.json", function(req, res, next) {
    res.setHeader("Content-Type", "application/json");

    if (!req.session) {
        res.json({});
        return;
    }
  
    // that means req.session.user will be overwritten by req.user - which comes from the database
    if (ß.USE_PASSPORT)
        if (req.user) {
            if (req.session.passport.user) req.session.user = req.user;
            else req.session.user = {};
        }
     
  	// we can add additional manipulation here in this hook, ...
    ß.run_hook("session", req.session);

  return res.json(req.session);
});

// this is not used anywhere, it was left here temporary
ß.app.all("/api/session.json", function(req, res, next) {
    res.setHeader("Content-Type", "application/json");

    if (!req.session) {
        res.json({});
        return;
    }
  
    // that means req.session.user will be overwritten by req.user - which comes from the database
    if (ß.USE_PASSPORT)
        if (req.user) {
            if (req.session.passport.user) req.session.user = req.user;
            else req.session.user = {};
        }
     
  	// we can add additional manipulation here in this hook, ...
    ß.run_hook("session", req.session);

  return res.json(req.session);
});
