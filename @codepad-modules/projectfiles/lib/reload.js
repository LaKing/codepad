module.exports = function (path) {
    // send a message to pads so they reload themselves
    ß.io.of("/p").to(path).emit("reload");
    ß.ntc("reload " + path);
};
