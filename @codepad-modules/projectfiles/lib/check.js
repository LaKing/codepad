// Requires Node 10.10.0 +

const util = require("util");
const lstat = util.promisify(ß.fs.lstat);
const readdir = util.promisify(ß.fs.readdir);

var last = "";

async function check(path) {
    if (ß.BLACKLIST_DIRS.indexOf(path.split("/").pop()) >= 0) return "";
    let n = "";

    let dirs = await readdir(path, { withFileTypes: true });
    for (let d in dirs) {
        let name = dirs[d].name;
        if (dirs[d].isDirectory()) {
            n += "|" + (await check(path + "/" + name));
        }
        n += "|" + dirs[d].name;
    }
    return n;
}

// a very fast recursive check of folders and files change.

module.exports = async function () {
    let x = await check(ß.PROJECTDIR);
    if (last !== x) {
        last = x;
        ß.run_hook("projectfiles_update");
    }
};
