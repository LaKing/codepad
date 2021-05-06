// global gears
ß.projectfiles = {};
ß.editor = {};

// whenever we detect a change in the filesystem we will set this variable to true.
ß.filetree_changed = false;

// watch file changes on the server
if (ß.server_watch === false || ß.server_watch === true) {
    if (ß.server_watch) console.log("+ Server-side file watching is enabled. Changes on the server files will update the pads.");
    else console.log("! Server-side file watching is disabled. Changes on the server files will never update any pads. Set ß.server_watch = true to change.");
} else ß.server_watch = true;

ß.file_write_operation_inprogress = {};

if (!ß.BLACKLIST_WATCH_EXTENSIONS) ß.BLACKLIST_WATCH_EXTENSIONS = "";