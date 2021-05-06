// @DOC ß.CLOUDDIR is a an external source that can be used in the project, eg google drive or anything rclone can import. Clouddir lists and serves files.

if (!ß.CLOUDDIR) ß.CLOUDDIR = {};
if (!ß.CLOUDDIR_PATH) ß.CLOUDDIR_PATH = ß.VAR + '/clouddir';
if (!ß.SERVE_CLOUDDIR_PATH) ß.SERVE_CLOUDDIR_PATH = true;

ß.lib.clouddir.build();
