## The @server module
#### /@vue-modules/server
## Express
Express is used by default in development mode, with the default Cache-Control max-age 0.  
If the ```ß.static_options``` is ```undefined``` at inicialization, it will set max-age to 24h if production env. var is set.  
It is recommended to use ```ß.static_options``` for express static server routes.


[@express.js:6](https://bp-devel.d250.hu:9001/p/@vue-modules/server/global/express.js?line=6)

Static assets like css files can be placed in any module or the project root, in a /static folder


[@serve_static.js:3](https://bp-devel.d250.hu:9001/p/@vue-modules/server/routes/serve_static.js?line=3)

Data representing assets like json files can be placed in any module or the project root, in a /data folder


[@serve_static.js:7](https://bp-devel.d250.hu:9001/p/@vue-modules/server/routes/serve_static.js?line=7)

<pre>
cert
 - localhost-cert-config.txt
 - localhost.crt
 - localhost.csr
 - localhost.key
 - localhost.org.pem
 - make-cert.sh
global
 - express.js
install
 - .gitignore
 - notify.sh
 - publish.sh
 - push.sh
 - server.js
 - start.sh
lib
 - load_credentials.js
 - serve_files.js
 - serve_static.js
routes
 - serve_static.js
 - socketio-stream.js
server
 - server.js
</pre>

