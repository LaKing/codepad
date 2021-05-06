// internal json based api
ß.app.post('/post-update-profile.json', function(req, res, next) {
    req.session.user_profile = req.body;
    res.json('OK');
    ß.debug('+ POST update-profile: ' + JSON.stringify(req.body));
});