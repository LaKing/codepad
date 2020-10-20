/*ßoilerplate */

module.exports = function (msg) {
    ß.io.of("/main").emit("ntc", {
        now: ß.now(),
        msg: msg,
    });
    //ß.ntc("opntc " + msg);
};
