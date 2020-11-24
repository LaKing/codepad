ß.chokidar = require("chokidar");

if (!ß.PROJECTDIR_OPTIONS) ß.PROJECTDIR_OPTIONS = {};
if (!ß.PROJECTDIR_OPTIONS.cwd) ß.PROJECTDIR_OPTIONS.cwd = ß.PROJECTDIR;
if (!ß.PROJECTDIR_OPTIONS.ignored) ß.PROJECTDIR_OPTIONS.ignored = ['**/*.pem', '.git', '**/node_modules/**', 'node_modules/**', '.git/**'];

ß.projectdir_watch = ß.chokidar.watch(ß.PROJECTDIR, ß.PROJECTDIR_OPTIONS);
