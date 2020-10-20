/*ßoilerplate */

module.exports = function (username, opname, filepath) {
    var data = {};
    data.now = ß.now();
    data.username = username;
    data.opname = opname;
    data.filepath = filepath;

    ß.io.of("/main").emit("ntc", data);
    //ß.ntc("oplog " + username + " " + opname + " " + filepath);
	ß.lib.projectfiles.ops(username, opname, filepath);
};
