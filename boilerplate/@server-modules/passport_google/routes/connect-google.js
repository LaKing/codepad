/*ßoilerplate */

ß.app.get('/connect/google', ß.passport.authorize('google', {
    scope: ['profile', 'email']
}));
