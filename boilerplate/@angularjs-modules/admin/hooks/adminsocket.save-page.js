/*ßoilerplate */

const editor_path = ß.VAR + '/editor';

function content_check(data) {
  if (data.indexOf('"ng-binding"') > -1) return false;
  
  return true;
}

function filtered(str) {
    return str.replace(/<!----/g, '').replace(/---->/g, '').replace(/####/g, '##');
}

function get_file_by_tag(data) {
    var arr = data.split('!');
    if (arr[1] === '-- @path') return arr[2].trim();
    console.log("ERROR in adminsocket.save-page - could not identify tag for path");
    return false;
}

function write_file(file, content) {
    var filename = file.split('/').pop();
    var folder = file.substring(0, file.length - filename.length - 1);
    const language = ß.language;

        ß.fs.mkdirp(folder, function(err) {
            if (err) return console.log("ERROR in adminsocket.save-page mkdirp", err);

            // this is the real thing
            ß.fs.writeFile(file, content, function(err) {
                if (err) return console.log("ERROR in adminsocket.save-page writeFile", err);

                for (let l = 0; l < language.list.length; l++) {
                    ß.lib.language.render_editor_file(language.list[l], file);
                    ß.lib.language.render_file(language.list[l], file);
                }
                ß.msg("Inline-editor-saved " + filename);
                ß.io.emit("success", "Save " + filename);
            });
        });
}    


function make_backup_and_write_file(file, content) {
    var bak = editor_path+ '/' + ß.now().replace(' ', '-') + '-' + file.split('/').pop();
    ß.fs.readFile(file, 'utf8', function(err, data) {
        if (err) return console.log("ERROR in adminsocket.save-page make_backup readFile", err);    
        
        ß.fs.writeFile(bak, data, function(err) {
            if (err) return console.log("ERROR in test adminsocket.save-page make_backup writeFile", err);
            write_file(file, content);
        });
        
    });
}

module.exports = function(socket) {

    socket.on("admin-save-page", function(data) {
        // this is only a backup
        ß.fs.writeFile( editor_path + '/' +  ß.now().replace(' ', '-') + '-SAVE.html' , data, function(err) {
            if (err) return console.log("ERROR in test adminsocket.save-page", err);
        });

        var file_tag = get_file_by_tag(data);

        if (!file_tag) {
            console.log("ERROR. Could not identify file");
            socket.emit("danger", "ERROR");
            return;
        }
        
        if (!content_check(data)) return socket.emit('danger', 'NO, DATA-BINDED');
        
        var content = filtered(data.substring(18 + file_tag.length));

        var file = ß.CWD + file_tag;
        
        if (file_tag.substring(0, 12) === '/boilerplate') {
            file = ß.CWD + file_tag.substring(12);
            write_file(file, content);
        } else make_backup_and_write_file(file, content);        

    });

};

