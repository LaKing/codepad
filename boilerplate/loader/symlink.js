/*ßoilerplate */

const fs = ß.fs;

/* @DOC 
## symlinks
`ß.link` is a function to symlink a source path to a destination path. it will check if this is a legal command, and return with the success as boolean. 
Underlying directories will be created.
*/

// an alternative to fs.ensureSymlinkSync(srcpath, dstpath, [type])
ß.link = function(source, target) {
    // skip if no source or destination exist
    if (!ß.fs.existsSync(source)) return false;
    if (ß.fs.existsSync(target)) return false;

    // make sure the target directory exist
    let target_dir = ß.path.dirname(target);
    if (!ß.fs.existsSync(target_dir)) fs.mkdirpSync(target_dir);

    // use fs native symlink
    ß.fs.symlinkSync(source, target);
    return true;
};

// @DOC The `ß.uplink` function will symlink everything that a folder has to a new real folder
// non-recursive
if (!ß.uplink)
    ß.uplink = function(path, destination) {
        if (!fs.isDirSync(path)) {
            ß.error(path + " is not a valid directory, can not uplink");
            return false;
        }
        fs.mkdirpSync(destination);
        fs.inPathsSync(path, function(r) {
            let source = path + "/" + r;
            let target = destination + "/" + r;
            if (fs.existsSync(target)) return;
            fs.symlinkSync(source, target);
        });
        return true;
    };
