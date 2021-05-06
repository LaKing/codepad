/*ßoilerplate */

// the callback after google has authorized the user
ß.app.get('/connect/google/callback',
    ß.passport.authorize('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));