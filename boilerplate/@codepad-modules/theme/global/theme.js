/*ßoilerplate */

function get_themes(from) {
    ß.fs.inFilesSync(from, function (path) {
        var ext = ß.path.extname(path);
        if (ext === ".css") ß.THEMES.push(ß.path.basename(path, ext));
    });
}

if (!ß.THEME) ß.THEME = "cobalt";
if (!ß.THEMES) ß.THEMES = [];

get_themes(ß.get_module_path("theme", "static/codemirror/theme"));
get_themes(ß.get_module_path("codemirror", "node_modules/codemirror/theme"));
