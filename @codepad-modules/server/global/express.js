ß.express = require('express');

if (!ß.static_options)
    ß.static_options = {};

/* @DOC

	## Express
	Express is used by default in development mode, with the default Cache-Control max-age 0.  
	If the ```ß.static_options``` is ```undefined``` at inicialization, it will set max-age to 24h if production env. var is set.  
	It is recommended to use ```ß.static_options``` for express static server routes.  

*/

if (process.env.NODE_ENV === "production")
    ß.static_options = {
        maxage: '24h'
    };