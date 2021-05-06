/* @DOC

The cors module will allow express to use our API endpoints from several origings, eg. build and development.
The default configs use https and the development webpack hot module replacement uses our default port 9000.

*/

// It cant harm

const corsOptions = ß.CORS_OPTIONS || {
  origin: [ 'https://' + ß.HOSTNAME , 'https://' + ß.HOSTNAME + ':9000'],
  methods:['GET','POST'],
  credentials: true
};



if (ß.MODE === "development") {
    var cors = require('cors');
    ß.app.use(cors(corsOptions));
}
