## The @server module
#### /@server-modules/server
Static assets like css files can be placed in any module or the project root, in a /static folder


[`serve_static.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/server/express/serve_static.js?line=3)

Data representing assets like json files can be placed in any module or the project root, in a /data folder


[`serve_static.js:8`](https://bp-devel.d250.hu:9001/p/@server-modules/server/express/serve_static.js?line=8)

## Express  
Express is used by default in development mode, with the default Cache-Control max-age 0.    
If the `ß.STATIC_OPTIONS` is `undefined` at inicialization, it will set max-age to 24h if production env. var is set.    
It is recommended to use `ß.STATIC_OPTIONS` for express static server routes.


[`express.js:6`](https://bp-devel.d250.hu:9001/p/@server-modules/server/global/express.js?line=6)

<pre>
cert
 - localhost-cert-config.txt
 - localhost.crt
 - localhost.csr
 - localhost.key
 - localhost.org.pem
 - make-cert.sh
express
 - serve_static.js
global
 - express.js
init
 - await-https-server.js
lib
 - load_credentials.js
 - serve_files.js
 - serve_static.js
server
 - export-boilerplate-variables.js
 - server.js
</pre>

