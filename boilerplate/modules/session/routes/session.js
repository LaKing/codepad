/*jshint esnext: true */

const app = ß.app;

// EXPRESS requests
app.get('/session', function(req, res, next) {
        res.setHeader('Content-Type', 'application/json');

    if (!req.session) {
        res.send('{}');
        return;
    }
    if (!req.session.passport) {
        res.send(JSON.stringify(req.session));
        return;
    }

    ß.User.findById(req.session.passport.user, function(err, user) {
        if (err) {
            console.error("ERROR in session request", err);
            res.send('{}');
            return;
        }
        if (!user) {
            console.error("ERROR in session request - no ruser");
            res.send('{}');
            return;
        }

        ß.lib.session.update_user(req.session, user);
        res.send(JSON.stringify(req.session));
    });
});
app.post('/session-data', function(req, res, next) {
    console.log('POST', req.body);
    req.session.data = req.body;
    //req.session.save();
    res.send('OK');
    //Ł(req.body, req.session);
});
