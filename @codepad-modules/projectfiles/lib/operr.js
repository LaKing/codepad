/*ßoilerplate */

module.exports = function(msg, realpath) {
    ß.io.of("/main").emit("ntc", {
        now: ß.now(),
        msg: msg
    });
    ß.io.of("/main").emit("err", msg);
  	ß.ntc("operr " + msg + " " + realpath);
};
