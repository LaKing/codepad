if (!ß.git) ß.git = require("isomorphic-git");

if (!ß.GIT_DEPTH) ß.GIT_DEPTH = 10000;
if (!ß.GIT_MAX_COMMITS_HISTORY) ß.GIT_MAX_COMMITS_HISTORY = 500;
if (!ß.GIT_MIN_COMMITS_HISTORY) ß.GIT_MIN_COMMITS_HISTORY = 100;
if (!ß.GIT_OPT_COMMITS_HISTORY) ß.GIT_OPT_COMMITS_HISTORY = 1;

ß.git_commits = [];