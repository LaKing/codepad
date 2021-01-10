module.exports = function (path) {
    // send a message to pads so they reload themselves
    ß.io.of("/p").to(path).emit("reload");
    console.log("projectfiles reload " + path);
};
