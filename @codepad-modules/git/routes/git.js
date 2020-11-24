/*ßoilerplate */

const CodeMirror = require(ß.get_module_path("codemirror", "mode/meta.js"));
const padejs = ß.get_module_path("pad", "public/pad.ejs");
const errejs = ß.get_module_path("pad", "public/err.ejs");
const txtejs = ß.get_module_path("pad", "public/txt.ejs");
const preejs = ß.get_module_path("pad", "public/pre.ejs");
const embedejs = ß.get_module_path("pad", "public/embed.ejs");
const gitejs = ß.get_module_path("git", "public/git.ejs");


const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

ß.app.get("/git/:oid/*", function (req, res, next) {
    // do we have a git repo at all?
    if (!ß.GIT_DIR) {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.write(send_ahead(req));
        res.write("<br>[No .git directory in the project]<br><br></body>");
        res.end();
        return;
    }

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

    var lint_options = ß.LINT_OPTIONS || "{esversion: 11}";
    var readonly = true;

    ß.lib.git.content_by_oid(entry, oid, function (err, data) {
        var mode = CodeMirror.findModeByFileName(filename);

        res.render(gitejs, {
            readonly: readonly,
            theme: theme,
            file: entry,
            data: data,
            mode: mode.mode,
            lint_options: lint_options,
        });
    });

});
