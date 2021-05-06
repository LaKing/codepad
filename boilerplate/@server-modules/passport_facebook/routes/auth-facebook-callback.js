/*ßoilerplate */

ß.app.get('/auth/facebook/callback',
    ß.passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));