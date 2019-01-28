/* @DOC
`ß.fs` is reference to the [fs-extra](https://github.com/jprichardson/node-fs-extra) package 
Instead of `fs = require('fs');` you can use `ß.fs` directly, use `mkdirp`, and `readJson` and other handy functions. 
*/
// @DOC `ß.path` is the native path
if (!ß.path) ß.path = require("path");

const fs = require("fs-extra");

if (!ß.fs) ß.fs = fs;

// @DOC `fs.isDirSync` and `fs.isFileSync` are some extra function to check if they exists for real. The only argument is the path. Works with symlinked paths. 

if (!ß.fs.isDirSync)
    ß.fs.isDirSync = function(path) {
        if (!fs.existsSync(path)) return false;
        return fs.lstatSync(fs.realpathSync(path)).isDirectory();
    };

if (!ß.fs.isFileSync)
    ß.fs.isFileSync = function(path) {
        if (!fs.existsSync(path)) return false;
        return fs.lstatSync(fs.realpathSync(path)).isFile();
    };

// process is always a function with a single result argument
// ß.fs.inPathsSync(path, function(r) {});

/* 
	@DOC `fs.inPathsSync` will give all entries, `fs.inFilesSync` all files and `fs.inDirsSync` all folder. 
	First argument is the path, second is the function to be called on each result items. The processor function works with a single argument, the result itself.
*/

if (!ß.fs.inPathsSync)
    ß.fs.inPathsSync = function(path, process) {
        if (!fs.existsSync(path)) return;
        let paths = fs.readdirSync(path);
        for (let i = 0; i < paths.length; i++) {
            process(paths[i]);
        }
    };

if (!ß.fs.inFilesSync)
    ß.fs.inFilesSync = function(path, process) {
        if (fs.isDirSync(path)) {
            let files = fs.readdirSync(path);
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if (ß.fs.isFileSync(path + "/" + file)) process(file);
            }
        }
    };

if (!ß.fs.inDirsSync)
    ß.fs.inDirsSync = function(path, process) {
        if (fs.isDirSync(path)) {
            let dirs = fs.readdirSync(path);
            for (let i = 0; i < dirs.length; i++) {
                let dir = dirs[i];
                if (ß.fs.isDirSync(path + "/" + dir)) process(dir);
            }
        }
    };

function traverse_path_process_files(path, process) {
    function traverse_recursive(__path) {
      	// __path will be a relative path
		// on the combined path, call the recursion for directories
        fs.inDirsSync(path + "/" + __path, function(__dir) {
            traverse_recursive(__path + "/" + __dir);
        });
		// for files we call our process function with the relative path as argument
        fs.inFilesSync(path + "/" + __path, function(__file) {
            process(__path + "/" + __file);
        });
    }

    traverse_recursive("");
}


// @DOC `ß.fs.traverse_path_process_files` is a recursive sync function that will process all files starting with the given path.

// export on fs
if (!ß.fs.traverse_path_process_files) ß.fs.traverse_path_process_files = traverse_path_process_files;
