
ß.app.get('/logout', function(req, res) {
    req.logout();
    if (req.session) req.session.destroy();
    res.redirect('/');
});


ß.app.all('/logout.json', function(req, res) {
    ß.debug("logout");
    req.logout();
    if (req.session) req.session.destroy();
    res.json(true);
});
