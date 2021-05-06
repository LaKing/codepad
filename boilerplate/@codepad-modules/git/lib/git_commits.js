const git = ß.git;
const fs = ß.fs;
const dir = ß.PROJECTDIR;

module.exports = async function (path, callback) {
  	ß.debug(" - reading " + ß.GIT_DEPTH + " git commits");

    var commits = false;

    try {
        commits = await git.log({ fs, dir , depth: ß.GIT_DEPTH});
    } catch (error) {
        ß.msg(" - no git commits");
        ß.debug(error);
        if (callback) callback();
        return false;
    }
  	ß.debug(" - git has " + commits.length + " commits");
    ß.git_commits = commits;
  	if (callback) callback(commits);
  	return commits;
};