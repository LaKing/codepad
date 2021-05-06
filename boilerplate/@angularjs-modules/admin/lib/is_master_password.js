/*ßoilerplate */

/* @DOC
	The lib-function `ß.lib.admin.is_master_password(password)` checks whether the given password is listed in the passwords config file `config/admin-passwords.json`.
    Note that there is no username associated with the password, the admin user has access right to every passport id account.
*/

const password_file = ß.CWD + '/config/admin-passwords.json';
const fs = ß.fs;

var passwords = {};

// This just reads or sets admin passwords to a default
if (fs.existsSync(password_file)) {
    passwords = fs.readJsonSync(password_file);
} else {
    passwords.master = "******";
    passwords.devel = "***";
    fs.writeJsonSync(password_file, passwords);
}


// Iterate thru the passwords object and return a boolean value.
module.exports = function(password) {
  
    var arr = Object.keys(passwords);

    for (var i = 0; i < arr.length; i++) {
        if (passwords[arr[i]] === password) return true;
    }

    return false;
  
};
