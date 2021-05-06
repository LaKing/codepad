## The @passport_google module
#### /@server-modules/passport_google
The lib function `ß.lib.passport_google.config_auth()` loads or sets the appropriate google passport file.  
   The settings can be set in `/config/passport_google.json` or in `/config/passport_google.debug.json`.  
   To get passport-google to work, you should have a clientID, clientSecret and the callbackURL. These can be obtained from [Google Developers Console](https://console.developers.google.com/).   
   We use [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth).


[`config_auth.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/passport_google/lib/config_auth.js?line=3)

<pre>
lib
 - config_auth.js
passport
 - google.js
routes
 - auth-google-callback.js
 - auth-google.js
 - connect-google-callback.js
 - connect-google.js
 - unlink-google.js
user_model
 - keys
</pre>

