/*ßoilerplate */

module.exports = function(socket, revision, operation) {
    var filepath = socket.projectfile;
    var username = socket.username || "Guest";

    if (!filepath) return;
    if (!ß.projectfiles[filepath]) return;

    ß.lib.projectfiles.oplog(username, operation, socket.projectfile);

    if (!ß.projectfiles[filepath].at) ß.projectfiles[filepath].at = {};
    if (!ß.projectfiles[filepath].at[username])
        ß.projectfiles[filepath].at[username] = {};

    ß.projectfiles[filepath].at[username][socket.id] = revision;

    ß.lib.filetree.send_files();
};
