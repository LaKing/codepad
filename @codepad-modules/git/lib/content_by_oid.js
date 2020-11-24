const git = ß.git;
const fs = ß.fs;
const dir = ß.GIT_DIR;

module.exports = async function (filepath, oid, callback) {
    if (!dir) return;
    let { blob } = await git.readBlob({
        fs,
        dir,
        oid,
        filepath,
    });
    callback(null, Buffer.from(blob).toString("utf8"));
};
