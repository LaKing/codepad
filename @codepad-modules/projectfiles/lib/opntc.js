/*ßoilerplate */

module.exports = function (msg) {
    let now = ß.now();
    ß.io.of("/main").emit("ntc", {
        now: now,
        msg: msg,
    });
    ß.lib.projectfiles.log(msg);

};

/*

            if (state.ntc.now) txt += " " + state.ntc.now;
            if (state.ntc.username) txt += " " + state.ntc.username;
            if (state.ntc.opname) txt += " " + state.ntc.opname;
            if (state.ntc.filepath) txt += " " + state.ntc.filepath;

*/