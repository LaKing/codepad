## The @server module
#### /@server-modules/server
Static assets like css files can be placed in any module or the project root, in a /static folder


[`serve_static.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/server/express/serve_static.js?line=3)

Data representing assets like json files can be placed in any module or the project root, in a /data folder


[`serve_static.js:8`](https://bp-devel.d250.hu:9001/p/@server-modules/server/express/serve_static.js?line=8)

## Express  
Express is used by default in development mode, with the default Cache-Control max-age 0.    
If the `ß.STATIC_OPTIONS` is `undefined` at inicialization, it will set max-age to 24h if production env. var is set.    
Therefore, it is recommended to use `ß.STATIC_OPTIONS` for express static server routes.


[`app.js:6`](https://bp-devel.d250.hu:9001/p/@server-modules/server/global/app.js?line=6)

We set the number of spaces for indentation to two in nn-production mode for better readability


[`app.js:23`](https://bp-devel.d250.hu:9001/p/@server-modules/server/global/app.js?line=23)

The `server` module uses express as https server


[`https-server.js:35`](https://bp-devel.d250.hu:9001/p/@server-modules/server/server/https-server.js?line=35)

<pre>
cert
 - localhost-cert-config.txt
 - localhost.crt
 - localhost.csr
 - localhost.key
 - localhost.org.pem
 - make-cert.sh
express
 - app-api.js
 - bodyparser.js
 - compression.js
 - ejs.js
 - serve_static.js
 - static.js
global
 - app.js
init
 - await-https-server.js
lib
 - load_credentials.js
 - requestRulesMatch.js
 - rewrites.js
 - serve_files.js
 - serve_static.js
post-index
 - 404.js
 - 500.js
server
 - export-boilerplate-variables.js
 - https-server.js
</pre>

