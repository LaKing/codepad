
const bodyParser = require("body-parser");

ß.app.use(bodyParser.json()); // get information from html forms
ß.app.use(
    bodyParser.urlencoded({
        extended: true
    })
);