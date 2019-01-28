if (!ß.express) ß.express = require('express');

if (!ß.STATIC_OPTIONS)
    ß.STATIC_OPTIONS = {};

/* @DOC

	## Express
	Express is used by default in development mode, with the default Cache-Control max-age 0.  
	If the `ß.STATIC_OPTIONS` is `undefined` at inicialization, it will set max-age to 24h if production env. var is set.  
	Therefore, it is recommended to use `ß.STATIC_OPTIONS` for express static server routes.  

*/

if (ß.MODE === "production")
    ß.STATIC_OPTIONS = {
        maxage: '24h'
    };

// create express app instance
if (!ß.app) ß.app = ß.express();

// @DOC We set the number of spaces for indentation to two in nn-production mode for better readability
if (ß.MODE !== "production") ß.app.set("json spaces", 2);

if (ß.lib.settings) ß.app.locals.settings = ß.lib.settings.readSync();

