## The @passport_facebook module
#### /@server-modules/passport_facebook
The lib function `ß.lib.passport_facebook.config_auth()` loads or sets the appropriate facebook passport config file.  
   The settings can be set in `config/passport_facebook.json` or `config/passport_facebook.debug.json`.  
   To get passport-facebook to work, there needs to be a facebook app, and the config shall contains the secret-app-ID, the app-secret, and which data fields are required by the app.  
   Under the hood, we use [passport-facebook](https://github.com/jaredhanson/passport-facebook).


[`config_auth.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport_facebook/lib/config_auth.js?line=3)

<pre>
lib
 - config_auth.js
passport
 - facebook.js
routes
 - auth-facebook-callback.js
 - auth-facebook.js
 - connect-facebook-callback.js
 - connect-facebook.js
 - unlink-facebook.js
user_model
 - keys
</pre>

