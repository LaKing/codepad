// load a csvfile from a path to a json object

const csv = require("csvtojson");

module.exports = function(path, callback) {
    //ß.fs.readFile(path, "utf-8", function(err, data) {
    //    if (err) return callback(err, null);

        csv({ ignoreEmpty: true })
            .fromFile(path)
            .then(result => {
                return callback(null, result);
            });
    //});
};
