const git = ß.git;
const fs = ß.fs;
const dir = ß.GIT_DIR;

module.exports = async function (path, callback) {
    if (!dir) return;
    const commitsThatMatter = [];
    var commits = ß.git_commits;

    if (!ß.projectfiles[path]) return callback(null, commitsThatMatter);
    if (!ß.projectfiles[path].file) return callback(null, commitsThatMatter);
    if (ß.projectfiles[path].readonly) return callback(null, commitsThatMatter);

    const filepath = path.substring(1);

    let count_max = ß.GIT_MAX_COMMITS_HISTORY;
    let count_min = ß.GIT_MIN_COMMITS_HISTORY;
    let count_opt = 1 + ß.GIT_OPT_COMMITS_HISTORY;

  if (commits) {
        let lastSHA = null;
        let lastCommit = null;
        for (const commit of commits) {
          
            // count limiter
            if (count_max <= 0) break;
			count_max--;
            count_min--;
            try {
                const o = await git.readObject({ fs, dir, oid: commit.oid, filepath });
                //console.log(path, o.oid, commit.oid, count_min, count_opt, count_max, commitsThatMatter.length);
                if (o.oid !== lastSHA) {
                    if (lastSHA !== null) commitsThatMatter.push({ oid: lastCommit.oid, message: lastCommit.commit.message, timestamp: commit.commit.author.timestamp, name: commit.commit.author.name });
                    lastSHA = o.oid;

                    // count limiter
                    count_opt--;
                    if (count_min <= 0) if (count_opt <= 0) {
                        if (lastCommit) commitsThatMatter.push({ oid: lastCommit.oid, message: lastCommit.commit.message, timestamp: commit.commit.author.timestamp, name: commit.commit.author.name });
                        break;
                    }
                }
            } catch (err) {
                // file no longer there
                if (lastCommit) commitsThatMatter.push({ oid: lastCommit.oid, message: lastCommit.commit.message, timestamp: commit.commit.author.timestamp, name: commit.commit.author.name });
                break;
            }
            lastCommit = commit;
        }

        ß.projectfiles[path].git = commitsThatMatter;
    }

    if (callback) callback(null, commitsThatMatter);
};

/*

commit

{
oid: '4b43b6be4ddfd20ab9487c7453150a598855c23f',
commit: {
message: '2.3.747\n',
parent: [ '4916660484ccc19a49c893df8f4ff1fefeffd851' ],
tree: 'f4abff3c9d8d75b3d9d2fdf063e22fc70b11ec89',
author: {
name: 'codepad',
email: 'codepad@codepad-devel',
timestamp: 1603659210,
timezoneOffset: -60
},
committer: {
name: 'codepad',
email: 'codepad@codepad-devel',
timestamp: 1603659210,
timezoneOffset: -60
}
},
payload: 'tree f4abff3c9d8d75b3d9d2fdf063e22fc70b11ec89\n' +
'parent 4916660484ccc19a49c893df8f4ff1fefeffd851\n' +
'author codepad <codepad@codepad-devel> 1603659210 +0100\n' +
'committer codepad <codepad@codepad-devel> 1603659210 +0100\n' +
'\n' +
'2.3.747\n'
}

*/