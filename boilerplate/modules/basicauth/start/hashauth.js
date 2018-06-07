/*jshint esnext: true */

var crypto = require('crypto');

var hashcash = {};

const passwords = ß.lib.basicauth.passwords();

function authorizer(username, password, cb) {

    var hash = crypto.createHash(ß.hash_typ).update(password).digest(ß.hash_dig);
    var path = ß.hash_dir + "/" + username.toLowerCase() + '/' + ß.hash_ext;

    if (hashcash[username] === hash) return cb(null, true);
    if (passwords[username] === password) return cb(null, true);

    ß.fs.readFile(path, 'utf8', function(err, contents) {
        // dont do anything if there is an error
        if (contents === hash) {
            hashcash[username] = contents;
            return cb(null, true);
        } else return setTimeout(function() {
            cb(null, false);
        }, 3000);
    });
}


/// ---- auth ----------

ß.app.use(ß.basicAuth({
    authorizer: authorizer,
    authorizeAsync: true,
    challenge: true,
    realm: ß.HOSTNAME
}));

// ----------------------