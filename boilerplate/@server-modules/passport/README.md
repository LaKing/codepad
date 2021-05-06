## The @passport module
#### /@server-modules/passport
When the user changes the languge, his preference is saved


[`update_user_lang.set_session.js:1`](https://bp-devel.d250.hu:9001/p/@server-modules/passport/hooks/update_user_lang.set_session.js?line=1)

This module defines the User mongo database;


[`user.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport/init/user.js?line=3)

The lib-function `ß.lib.passport.isLoggedIn(req, res, next)` checks if the user is authenticated or not.  
   It can be used as express middleware.


[`isLoggedIn.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport/lib/isLoggedIn.js?line=3)

The local strategy is responsible for the email-password based login.


[`local.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport/passport/local.js?line=3)

The `post-delete-account.json` requests deletes the user completley from the User database.


[`post-delete-account.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport/routes/post-delete-account.js?line=3)

The `post-email.json` request checks if the given email address is a valid SMTP reciever.


[`post-email.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport/routes/post-email.js?line=3)

The `post-login.json` request is responsible to log users in via email, password, and rem payload.


[`post-login.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport/routes/post-login.js?line=3)

The `post-logout.json` route destroys the user session.


[`post-logout.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport/routes/post-logout.js?line=3)

The `post-password-update.json` request


[`post-password-update.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport/routes/post-password-update.js?line=3)

<pre>
express
 - passport.js
global
 - passport.js
hooks
 - update_user_lang.set_session.js
init
 - serialization.js
 - user.js
lib
 - delete.js
 - get_password.js
 - isLoggedIn.js
 - login.js
 - login_delay.js
passport
 - local.js
routes
 - logout.js
 - post-delete-account.js
 - post-email.js
 - post-login.js
 - post-logout.js
 - post-password-update.js
start
 - socketio_user.js
user_model
 - keys
 - methods
</pre>

