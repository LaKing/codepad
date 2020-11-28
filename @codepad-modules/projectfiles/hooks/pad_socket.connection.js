
module.exports = function (socket) {
    if (!socket) return;
    if (!socket.projectfile) return ß.err("no projectfile on socket");

	return ß.lib.projectfiles.new(socket);
};
