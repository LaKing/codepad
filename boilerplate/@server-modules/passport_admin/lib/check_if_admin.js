/*ßoilerplate */

/* @DOC
	The lib-function `ß.lib.passport_admin.check_if_admin(id)` checks if the user with the given passport id has admin-level permissions on the website.
	Those id's can be set in the `config/admin-passports.json` file or, in debug mode if the file exists `config/admin-passports.debug.json` is used.
*/


// We will use these files to load passport ID's, that are granted admin rights within the site.
var passport_file = ß.CWD + '/config/admin-passports.json';
var debug_file = ß.CWD + '/config/admin-passports.debug.json';

const fs = ß.fs;

if (ß.DEBUG && fs.existsSync(debug_file)) passports_file = debug_file;

var passports = {};

// Actually, this is just a default
if (fs.existsSync(passport_file)) {
    passports = fs.readJsonSync(passport_file);
} else {
  	// TODO let those be valid passport ID's.
    passports.primary = "5a29e7a52d3c7141834599ca";
    passports.secondary = "5a29e7a52d3c7141834599cb";

    fs.writeJsonSync(passport_file, passports);
}

// Iterate thru the object and return a boolean value.
module.exports = function(id) {

    var arr = Object.keys(passports);

    for (var i = 0; i < arr.length; i++) {
        if (passports[arr[i]] === String(id)) return true;
    }

    return false;
};
