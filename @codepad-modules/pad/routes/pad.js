/*ßoilerplate */

const CodeMirror = require(ß.get_module_path('codemirror', 'mode/meta.js'));
const padejs = ß.get_module_path('pad', 'public/pad.ejs');
const errejs = ß.get_module_path('pad', 'public/err.ejs');
const txtejs = ß.get_module_path('pad', 'public/txt.ejs');
const preejs = ß.get_module_path('pad', 'public/pre.ejs');
const embedejs = ß.get_module_path('pad', 'public/embed.ejs');

function send_files() {
    for (let i in ß.io.sockets.sockets) {
        let socket = ß.io.sockets.sockets[i];
        if (socket.files_socket) socket.emit('files', ß.projectfiles);
    }
}

ß.app.get('/p/*', function(req, res, next) {
  
    var entry = req.params[0];
    var filename = req.params[0].split('/').pop();
  
    var fullpath = ß.projectdir + "/" + entry;

    var dot = filename.lastIndexOf(".");
    var ext = 'txt';
    if (dot > -1) ext = filename.substring(dot + 1, filename.length).toLowerCase();

  	var lint_options = ß.LINT_OPTIONS || '{esversion: 6}';
  
    var mode = CodeMirror.findModeByFileName(filename);
    if (mode) {
        if (mode.mode !== 'null')
            res.render(padejs, {
                theme: ß.THEME,
                file: entry,
                mode: mode.mode,
              	lint_options: lint_options
            });
        else res.render(txtejs, {
            theme: ß.THEME,
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
                theme: ß.THEME,
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
                theme: ß.THEME,
                file: entry,
                code: err.code
            });
            res.render(preejs, {
                txt: data
            });
        });
        return;
    }

    // pdf, jpg, and similar ...
    res.sendFile(fullpath, {}, function(err) {
        đ(err);
        if (err) return res.render(errejs, {
            theme: ß.THEME,
            file: entry,
            code: err.code
        });
    });

});