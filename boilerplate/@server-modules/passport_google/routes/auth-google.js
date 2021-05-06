/*ßoilerplate */

ß.app.get('/auth/google', ß.passport.authenticate('google', {
    scope: ['profile', 'email']
}));
