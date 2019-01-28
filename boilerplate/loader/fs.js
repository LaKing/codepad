/* @DOC
`ß.fs` is reference to the [fs-extra](https://github.com/jprichardson/node-fs-extra) package 
Instead of `fs = require('fs');` you can use `ß.fs` directly, use `mkdirp`, and `readJson` and other handy functions. 
*/
// @DOC `ß.path` is the native path
if (!ß.path) ß.path = require("path");

const fs = require("fs-extra");

if (!ß.fs) ß.fs = fs;

if (!ß.fs.isDir)
    ß.fs.isDir = function(path) {
        if (!fs.existsSync(path)) return false;
        return fs.lstatSync(fs.realpathSync(path)).isDirectory();
    };

if (!ß.fs.isFile)
    ß.fs.isFile = function(path) {
        if (!fs.existsSync(path)) return false;
        return fs.lstatSync(fs.realpathSync(path)).isFile();
    };

// process is always a function with a single result argument
// ß.fs.inPaths(path, function(r) {});

if (!ß.fs.inPaths)
    ß.fs.inPaths = function(path, process) {
        if (!fs.existsSync(path)) return;
        let paths = fs.readdirSync(path);
        for (let i = 0; i < paths.length; i++) {
            process(paths[i]);
        }
    };

if (!ß.fs.inFiles)
    ß.fs.inFiles = function(path, process) {
        if (fs.isDir(path)) {
            let files = fs.readdirSync(path);
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if (ß.fs.isFile(path + "/" + file)) process(file);
            }
        }
    };

if (!ß.fs.inDirs)
    ß.fs.inDirs = function(path, process) {
        if (fs.isDir(path)) {
            let dirs = fs.readdirSync(path);
            for (let i = 0; i < dirs.length; i++) {
                let dir = dirs[i];
                if (ß.fs.isDir(path + "/" + dir)) process(dir);
            }
        }
    };

function traverse_path_process_files(path, process) {
    function traverse_recursive(__path) {
      	// __path will be a relative path
		// on the combined path, call the recursion for directories
        fs.inDirs(path + "/" + __path, function(__dir) {
            traverse_recursive(__path + "/" + __dir);
        });
		// for files we call our process function with the relative path as argument
        fs.inFiles(path + "/" + __path, function(__file) {
            process(__path + "/" + __file);
        });
    }

    traverse_recursive("");
}

// export on fs
if (!ß.fs.traverse_path_process_files) ß.fs.traverse_path_process_files = traverse_path_process_files;
