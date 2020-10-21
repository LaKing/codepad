/*const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

// PARAMETERS - CHANGE THESE FOR YOUR CODE

return;

const filepath = "test/me.sh";

(async () => {
    const commits = await git.log({ fs, dir });
    let lastSHA = null;
    let lastCommit = null;
    const commitsThatMatter = [];
    for (const commit of commits) {
        try {
            const o = await git.readObject({ fs, dir, oid: commit.oid, filepath });
            if (o.oid !== lastSHA) {
                if (lastSHA !== null) commitsThatMatter.push(lastCommit);
                lastSHA = o.oid;
            }
        } catch (err) {
            // file no longer there
            commitsThatMatter.push(lastCommit);
            break;
        }
        lastCommit = commit;
    }

    console.log(commitsThatMatter);
    /*
  	let oid = commitsThatMatter[0].oid;
  
    let { blob } = await git.readBlob({
        fs,
        dir,
        oid,
        filepath
    });
    Ł(Buffer.from(blob).toString("utf8"));
  */
//})();
