ß.express = require('express');

if (!ß.STATIC_OPTIONS)
    ß.STATIC_OPTIONS = {};

/* @DOC

	## Express
	Express is used by default in development mode, with the default Cache-Control max-age 0.  
	If the `ß.STATIC_OPTIONS` is `undefined` at inicialization, it will set max-age to 24h if production env. var is set.  
	It is recommended to use `ß.STATIC_OPTIONS` for express static server routes.  

*/

if (process.env.NODE_ENV === "production")
    ß.STATIC_OPTIONS = {
        maxage: '24h'
    };