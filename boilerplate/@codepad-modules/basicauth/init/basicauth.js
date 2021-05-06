const os = require("os");

if (!ß.hash_typ) ß.hash_typ = "sha512";
if (!ß.hash_dig) ß.hash_dig = "hex";

if (!ß.USERS_DIR) {
    // check if we have this folder from srvctl with shared users
    SRVCTL3_USERS_DIR = "/var/srvctl3/share/containers/" + os.hostname() + "/users";
    if (ß.fs.isDirSync(SRVCTL3_USERS_DIR)) ß.USERS_DIR = SRVCTL3_USERS_DIR;
    // if not, continue, ...
}

if (!ß.USERS_DIR) ß.USERS_DIR = "/var/codepad/users";

if (!ß.hash_ext) ß.hash_ext = ".hash";
if (ß.basic_auth !== undefined) return;

var crypto = require("crypto");
//var basicAuth = require('express-basic-auth');
var basicAuth = require("../custom-auth.js");

var hashcash = {};

const passwords = ß.lib.basicauth.passwords();

function codepad_authorizer(username, password, cb) {
    var hash = crypto.createHash(ß.hash_typ).update(password).digest(ß.hash_dig);
    var path = ß.USERS_DIR + "/" + username.toLowerCase() + "/" + ß.hash_ext;

    if (hashcash[username] === hash) return cb(null, true);
    if (passwords[username] === password) return cb(null, true);

    ß.fs.readFile(path, "utf8", function (err, contents) {
        // dont do anything if there is an error
        if (contents === hash) {
            hashcash[username] = contents;
            return cb(null, true);
        } else
            return setTimeout(function () {
                cb(null, false);
            }, 3000);
    });
}

ß.codepad_authorizer = codepad_authorizer;
ß.basicAuth = basicAuth;
ß.basic_auth = {
    authorizer: codepad_authorizer,
    authorizeAsync: true,
    challenge: true,
    realm: ß.HOSTNAME,
};
