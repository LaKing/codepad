const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

module.exports = async function(path, callback) {
    if (!ß.projectfiles[path]) return;
    if (!ß.projectfiles[path].file) return;
    //if (ß.projectfiles[file].readonly) return;

    const filepath = path.substring(1);

    const commits = await git.log({ fs, dir });
    let lastSHA = null;
    let lastCommit = null;
    const commitsThatMatter = [];
    for (const commit of commits) {
        try {
            const o = await git.readObject({ fs, dir, oid: commit.oid, filepath });
            if (o.oid !== lastSHA) {
                if (lastSHA !== null) commitsThatMatter.push({ oid: lastCommit.oid, message: lastCommit.commit.message });
                lastSHA = o.oid;
            }
        } catch (err) {
            // file no longer there

            if (lastCommit) commitsThatMatter.push({ oid: lastCommit.oid, message: lastCommit.commit.message });
            break;
        }
        lastCommit = commit;
    }
    ß.projectfiles[path].git = commitsThatMatter;

    if (callback) callback();
};
