// @DOC ß.DATA is a an internal source that can be used in the project. Datadir lists and serves files.

// the values will be mime types
if (!ß.DATADIR) ß.DATADIR = {};

// root path of files to be considered
if (!ß.DATADIR_PATH) ß.DATADIR_PATH = ß.CWD + '/datadir';

// serve them or not?
if (!ß.SERVE_DATADIR_PATH) ß.SERVE_DATADIR_PATH = true;

ß.lib.datadir.build();
