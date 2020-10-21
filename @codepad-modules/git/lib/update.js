const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

module.exports = async function () {

    for (let i in ß.projectfiles) {
      
      //ß.lib.git.path_commits(i);
      
        /*
        if (!ß.projectfiles[i].file) continue;
		if (ß.projectfiles[i].readonly) continue;
      
        const filepath = i.substring(1);

        const commits = await git.log({ fs, dir });
        let lastSHA = null;
        let lastCommit = null;
        const commitsThatMatter = [];
        for (const commit of commits) {
            try {
                const o = await git.readObject({ fs, dir, oid: commit.oid, filepath });
                if (o.oid !== lastSHA) {
                    if (lastSHA !== null) commitsThatMatter.push({oid: lastCommit.oid, message: lastCommit.commit.message});
                    lastSHA = o.oid;
                }
            } catch (err) {
                // file no longer there
              	
                if (lastCommit) commitsThatMatter.push({oid: lastCommit.oid, message: lastCommit.commit.message});
                break;
            }
            lastCommit = commit;
        }
        
        //Ł(filepath, commitsThatMatter );
      	
      	ß.projectfiles[i].git = commitsThatMatter;
      */
    }
};
