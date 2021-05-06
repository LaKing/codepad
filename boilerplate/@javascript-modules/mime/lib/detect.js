const readChunk = require("read-chunk");
const fileType = require("file-type");
const mime = require("mime-types");

module.exports = function(file) {
    var file_mime = mime.lookup(file);
    
    /*
    try {
     //do a check based on file content?
     const ft = fileType(readChunk.sync(file, 0, fileType.minimumBytes));
     if (ft) if (ft.mime) file_mime = ft.mime;
    } catch(err) {
    	ß.err("Mime detect by content failed on " + file);
    }
    */  
      
    return file_mime;
};

/*
┏━━━ Ł 10:13:49 #0 typeof: string
┠─ /srv/codepad-project/var/clouddir/aszf/Adatvedelmi_Szabalyzat_EN.html
┗━━━ Ł at Object.module.exports [as detect] (/srv/codepad-project/@javascript-modules/mime/lib/detect.js:7:2)
ß-ERROR ERROR while loading /srv/codepad-project/@javascript-modules/clouddata/init/clouddata.js
┏━━━ ĐETONATE 10:13:49 AM
┠─ TypeError [ERR_INVALID_ARG_TYPE]: The "size" argument must be of type number. Received undefined
┠─ at Function.alloc (buffer.js:373:3)
┠─ at Function.module.exports.sync (/srv/codepad-project/@javascript-modules/mime/node_modules/read-chunk/index.js:28:22)
┠─ at Object.module.exports [as detect] (/srv/codepad-project/@javascript-modules/mime/lib/detect.js:9:35)
┠─ at add (/srv/codepad-project/@javascript-modules/clouddata/lib/build.js:3:27)
┠─ at /srv/codepad-project/boilerplate/loader/fs.js:74:13
┠─ at Object.ß.fs.inFilesSync (/srv/codepad-project/boilerplate/loader/fs.js:49:57)
┠─ at traverse_recursive (/srv/codepad-project/boilerplate/loader/fs.js:73:12)
┠─ at /srv/codepad-project/boilerplate/loader/fs.js:70:13
┠─ at Object.ß.fs.inDirsSync (/srv/codepad-project/boilerplate/loader/fs.js:60:55)
┠─ at traverse_recursive (/srv/codepad-project/boilerplate/loader/fs.js:69:12)
┠─ at Object.traverse_path_process_files (/srv/codepad-project/boilerplate/loader/fs.js:78:5)
┠─ at Object.module.exports [as build] (/srv/codepad-project/@javascript-modules/clouddata/lib/build.js:27:10)
┠─ at Object.<anonymous> (/srv/codepad-project/@javascript-modules/clouddata/init/clouddata.js:6:17)
┠─ at Module._compile (internal/modules/cjs/loader.js:1063:30)
┠─ at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
┠─ at Module.load (internal/modules/cjs/loader.js:928:32)
┠─ at Function.Module._load (internal/modules/cjs/loader.js:769:14)
┠─ at Module.require (internal/modules/cjs/loader.js:952:19)
┠─ at require (internal/modules/cjs/helpers.js:88:18)
┠─ at Object.ß.load (/srv/codepad-project/boilerplate/loader/load.js:81:21)
┠─ at Object.<anonymous> (/srv/codepad-project/boilerplate/index.js:29:3)
┠─ at Module._compile (internal/modules/cjs/loader.js:1063:30)

┗━━━━ Đ at Object.ß.load (/srv/codepad-project/boilerplate/loader/load.js:84:21)
Đ EXIT ERROR 101
# ERROR codepad-project.scope inactive

*/