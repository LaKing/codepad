/*ßoilerplate */

module.exports = function(socket) {

    if (!socket.files_socket) return;
    ß.lib.filetree.send_files();

};