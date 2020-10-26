/*ßoilerplate */

const CodeMirror = require(ß.get_module_path("codemirror", "mode/meta.js"));
const padejs = ß.get_module_path("pad", "public/pad.ejs");
const errejs = ß.get_module_path("pad", "public/err.ejs");
const txtejs = ß.get_module_path("pad", "public/txt.ejs");
const preejs = ß.get_module_path("pad", "public/pre.ejs");
const embedejs = ß.get_module_path("pad", "public/embed.ejs");
const gitejs = ß.get_module_path("git", "public/git.ejs");

//ß.io.of('/main').emit("files", ß.projectfiles);
    


const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

ß.app.get("/git/:oid/*", function(req, res, next) {
    let theme = ß.THEME;
    const username = ß.lib.basicauth.username_by_req(req);
    if (ß.settings[username]) if (ß.settings[username].theme) theme = ß.settings[username].theme;

    var entry = req.params[0];
    var filename = req.params[0].split("/").pop();
    var oid = req.params.oid;

    //Ł(entry, filename, req.params);

    var fullpath = ß.PROJECTDIR + "/" + entry;
    var path = "/" + entry;

    var dot = filename.lastIndexOf(".");
    var ext = "txt";
    if (dot > -1) ext = filename.substring(dot + 1, filename.length).toLowerCase();

    var lint_options = ß.LINT_OPTIONS || "{esversion: 9}";
    var readonly = true;

    ß.lib.git.content_by_oid(entry, oid, function(err, data) {
        var mode = CodeMirror.findModeByFileName(filename);

        res.render(gitejs, {
            readonly: readonly,
            theme: theme,
            file: entry,
            data: data,
            mode: mode.mode,
            lint_options: lint_options
        });
    });
  
    /*
    var mode = CodeMirror.findModeByFileName(filename);
    if (mode) {
        if (mode.mode !== 'null')
            res.render(padejs, {
              	readonly: readonly,
                theme: theme,
                file: entry,
                mode: mode.mode,
              	lint_options: lint_options
            });
        else res.render(txtejs, {
            readonly: readonly,
            theme: theme,
            file: entry
        });
        return;
    }

    //if (ext === 'pdf') return res.sendFile(fullpath);
    var ent = entry.toLowerCase();

  
      if (ext === 'log') {
        ß.fs.readFile(fullpath, 'utf8', function(err, data) {
            đ(err);
            if (err) return res.render(errejs, {
                theme: theme,
                file: entry,
                code: err.code
            });
            res.render(preejs, {
                txt: ß.lib.ansi.html(data)
            });
        });
        return;
    }
  
    if (ext === 'txt' || ext === 'log' || ext === 'csr' || ext === 'crt' || ext === 'key' || ext === 'pem' || ext === 'pid' || ent === 'version' || ent === 'license') {
        ß.fs.readFile(fullpath, function(err, data) {
            đ(err);
            if (err) return res.render(errejs, {
                theme: theme,
                file: entry,
                code: err.code
            });
            res.render(preejs, {
                txt: data
            });
        });
        return;
    }
//*/
});
