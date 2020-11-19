/*ßoilerplate */

module.exports = function (socket, revision, operation) {
    if (!revision) revision = 0;
    var filepath = socket.projectfile;
    var username = socket.username;

    if (!filepath) return;
    if (!ß.projectfiles[filepath]) return;

    ß.lib.projectfiles.oplog(username, operation, socket.projectfile);

    if (!ß.projectfiles[filepath].at) ß.projectfiles[filepath].at = {};
    if (!ß.projectfiles[filepath].at[username]) ß.projectfiles[filepath].at[username] = {};

    ß.projectfiles[filepath].at[username][socket.id] = revision;
    if (operation === "closed") delete ß.projectfiles[filepath].at[username][socket.id];
    ß.lib.projectfiles.send();
};