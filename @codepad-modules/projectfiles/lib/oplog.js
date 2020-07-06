/*ßoilerplate */

module.exports = function(username, opname, filepath) {
    var data = {};
    data.now = ß.now();
    data.username = username;
    data.opname = opname;
    data.filepath = filepath;

    ß.io.of("/main").emit("ntc", data);
};
