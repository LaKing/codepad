/*ßoilerplate */

ß.app.get('/connect/facebook/callback',
    ß.passport.authorize('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));