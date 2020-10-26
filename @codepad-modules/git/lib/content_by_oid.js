const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

module.exports = async function (filepath, oid, callback) {
    let { blob } = await git.readBlob({
        fs,
        dir,
        oid,
        filepath,
    });
    callback(null, Buffer.from(blob).toString("utf8"));
};
