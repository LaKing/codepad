/*jshint esnext: true */

// It would be safer to use localized versions of variables. ...
// we do not do this, but I keep it here for reference

// for data-only access
if (!ß.localize) ß.localize = function() {
    return JSON.parse(JSON.stringify(ß));
};

// for data and functions
if (!ß.local) ß.local = function() {
    return Object.assign({}, ß);
};

// to use a local version
//const _ß = ß.local(); // funtions and data
//const _ß = ß.localize(); // data only