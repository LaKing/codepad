	/*ßoilerplate */

ß.app.get('/auth/facebook', ß.passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));
