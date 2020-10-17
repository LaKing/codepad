const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

module.exports = async function (path, callback) {
    if (!ß.projectfiles[path]) return;
    if (!ß.projectfiles[path].file) return;
    //if (ß.projectfiles[file].readonly) return;
    var commits = false;

    const filepath = path.substring(1);
    try {
        commits = await git.log({ fs, dir });
    } catch (error) {
        ß.err(error);
        if (callback) callback();
        return;
    }

    if (commits) {
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
    }

    if (callback) callback();
};

/*

TODO fix

okt 02 07:03:50 bp-devel node[253981]: NotFoundError: Could not find HEAD.
okt 02 07:03:50 bp-devel node[253981]:     at Function.resolve (/usr/local/share/boilerplate/@codepad-modules/git/node_modules/isomorphic-git/index.cjs:1792:11)
okt 02 07:03:50 bp-devel node[253981]:     at async _log (/usr/local/share/boilerplate/@codepad-modules/git/node_modules/isomorphic-git/index.cjs:9716:15)
okt 02 07:03:50 bp-devel node[253981]:     at async Object.log (/usr/local/share/boilerplate/@codepad-modules/git/node_modules/isomorphic-git/index.cjs:9796:12)
okt 02 07:03:50 bp-devel node[253981]:     at async Object.module.exports [as path_commits] (/usr/local/share/boilerplate/@codepad-modules/git/lib/path_commits.js:12:25) {
okt 02 07:03:50 bp-devel node[253981]:   caller: 'git.log',
okt 02 07:03:50 bp-devel node[253981]:   code: 'NotFoundError',
okt 02 07:03:50 bp-devel node[253981]:   data: { what: 'HEAD' }
okt 02 07:03:50 bp-devel node[253981]: }


TODO fix file updates

*/
