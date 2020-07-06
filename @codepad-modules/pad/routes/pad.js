/*ßoilerplate */

const mime = require("mime");

const CodeMirror = require(ß.get_module_path("codemirror", "mode/meta.js"));

const padejs = ß.get_module_path("pad", "public/pad.ejs");
const errejs = ß.get_module_path("pad", "public/err.ejs");
const txtejs = ß.get_module_path("pad", "public/txt.ejs");
const preejs = ß.get_module_path("pad", "public/pre.ejs");
const embedejs = ß.get_module_path("pad", "public/embed.ejs");

ß.app.get("/p/*", function(req, res, next) {
    
    let theme = ß.THEME;
    const username = ß.lib.basicauth.username_by_req(req);
    if (ß.settings[username]) if (ß.settings[username].theme) theme = ß.settings[username].theme;

    var file = req.params[0];
    var filename = req.params[0].split("/").pop();

    var fullpath = ß.PROJECTDIR + "/" + file;
    var path = "/" + file;
 
  	ß.run_hook("pad", path);
  
    var dot = filename.lastIndexOf(".");
    var ext = "txt";
    if (dot > -1) ext = filename.substring(dot + 1, filename.length).toLowerCase();

    var lint_options = ß.LINT_OPTIONS || "{esversion: 9}";
    var readonly = false;

    if (ß.projectfiles[path]) if (ß.projectfiles[path].readonly) readonly = true;

  	//Ł(ß.projectfiles[path].size);
  
    var mode = CodeMirror.findModeByFileName(filename);

    //Ł(mode);

    if (mode) {
        return res.render(padejs, {
            readonly: mode.readonly || readonly,
            theme: theme,
            file: file,
            mode: mode.mode || "null",
            lint_options: lint_options
        });
    }

    //Ł(mime.getType(filename));

    // pdf, jpg, and similar ...
    res.sendFile(fullpath, {}, function(err) {
        đ(err);
        if (err)
            return res.render(errejs, {
                theme: theme,
                file: file,
                code: err.code
            });
    });
});
