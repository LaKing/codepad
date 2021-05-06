// Thjis turned out to be unnecessery, and I keep it here only temporary

/* 

	The `app.api(path, function)` extends our express methods with api-like endpoints
    In case of `path.json` we can use `res.api` as an alias to `res.json`
    In case of `path.txt` we can use `res.api` as the alias of `res.end` which does not use an etag

*/

/*
const util = require("util");

// res.send and res.end only accept strings as results
function stringify(arg) {
    // if the argument is a function it is not legal here actually
    if (typeof arg === "function") return "";
    // to-string converters
    if (typeof arg === "object") return util.inspect(arg, { showHidden: false, depth: null, compact: false });
    if (typeof arg === "boolean") {
        if (arg) return "true";
        else return "false";
    }
    if (typeof arg === "number") return "" + arg;
    return arg;
}

ß.app.api = function(path, fn) {
  
    ß.app.all(path + ".txt", function(req, res, next) {
        // txt-api
        res.api = function(arg) {
            // content-type
            if (!res.get("Content-Type")) {
                res.set("Content-Type", "text/html");
            }
            res.end(stringify(arg));
        };

        return fn(req, res, next);
    });

    ß.app.all(path + ".json", function(req, res, next) {
        // json-api
        res.api = res.json;

        return fn(req, res, next);
    });
};
*/