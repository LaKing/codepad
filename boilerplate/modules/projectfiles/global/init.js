ß.projectfiles = {};
ß.editor = {};

// ignore if there are more files then this in a folder
if (!ß.projectfiles_file_limit) ß.projectfiles_file_limit = 128;

if (ß.server_watch === undefined) ß.server_watch = true;

if (!ß.projectdir) ß.projectdir = '/srv/codepad-project';

ß.file_write_operation_inprogress = {};

if (ß.server_watch) console.log("+ Server-side file watching is enabled. Changes on the server files will update the pads.");
else console.log("! Server-side file watching is disabled. Changes on the server files will never update any pads. Set ß.server_watch = true to change.");
