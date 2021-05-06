/*ßoilerplate */

// get a path from any file. If present in the project, use that, otherwise use the one from the boilerplate 
if (!ß.views) ß.views = function(req, file) {
    var lang = ß.lib.language.get_by_req(req);
    return ß.VAR + '/local/' + lang + '/' + file;
};

if (!ß.local) ß.local = function(lang, file) {
    return ß.VAR + '/local/' + lang + '/' + file;
};