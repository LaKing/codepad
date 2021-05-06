/*ßoilerplate */

ß.app.get('/auth/google/callback',
    ß.passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));