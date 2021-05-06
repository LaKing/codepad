// @DOC ß.CLOUDDIR is a an external source that can be used in the project, eg google drive or anything rclone can import. The clouddata module imports json files.

if (!ß.CLOUDDATA) ß.CLOUDDATA = {};
if (!ß.CLOUDDATA_PATH) ß.CLOUDDATA_PATH = ß.VAR + '/clouddir';

ß.lib.clouddata.build();