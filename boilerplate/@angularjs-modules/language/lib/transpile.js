/*ßoilerplate */
const lib = ß.lib;
const fs = ß.fs;

// this iterates in all languages    
module.exports = function() {
  
    const language = ß.language;

    for (let l = 0; l < language.list.length; l++) {
        fs.mkdirpSync(ß.VAR + '/local/' + language.list[l]);
        fs.mkdirpSync(ß.VAR + '/editor/' + language.list[l]);
        ß.fs.chownSync(ß.VAR + '/local/' + language.list[l], ß.UID, ß.GID);
        ß.fs.chownSync(ß.VAR + '/editor/' + language.list[l], ß.UID, ß.GID);

    }

    for (let f in ß.frontend_files) {
        let file = ß.frontend_files[f];

        let ext = file.split('.').reverse()[0];
        if (ext === 'html' || ext === 'ejs' || ext === 'js' || ext === 'json' || ext === 'txt') {

            for (let l = 0; l < language.list.length; l++) {
                
                // a special format for editor html files
                if (ext === 'html') ß.lib.language.render_editor_file(language.list[l], file);
                ß.lib.language.render_file(language.list[l], file);
            }

        }

    }
    
    console.log(" - Language transpile " + Object.keys(ß.frontend_files).length + " frontend files.");

};
