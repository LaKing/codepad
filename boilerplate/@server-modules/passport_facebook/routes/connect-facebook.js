/*ßoilerplate */

ß.app.get('/connect/facebook', ß.passport.authorize('facebook', {
    scope: ['public_profile', 'email']
}));
