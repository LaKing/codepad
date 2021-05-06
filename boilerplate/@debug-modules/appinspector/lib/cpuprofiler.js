const fs = require("fs");
const os = require("os");

module.exports = function (cpuusage,cpuos,callback) {

    let id = ß.date() + "_" + ß.time();

    let profiler = require("v8-profiler-next");
    let _datadir = ß.APPINSPECTOR_SAVEDIR;

    function startprof() {
        setInterval(startProfiling, 1000);
    }

    function startProfiling() {
        // Start profiling
        profiler.startProfiling(id);

        // Schedule stop of profiling in x seconds
        setTimeout(function () {
            stopProfiling(id);
        }, ß.APPINSPECTOR_CPUPROFILE_DURATION);
    }

    function stopProfiling(id) {
        let profile = profiler.stopProfiling(id);
		let name = id + "-syscpu:" + cpuos +  "-pcpu:" + cpuusage + ".cpuprofile";
        fs.writeFile(_datadir + "/" +name, JSON.stringify(profile), function () {
            ß.debug("@Appinspector: CPU profiler data written to " + name);
            callback(name);
        });
        
    }
    startProfiling();

    return id + ".cpuprofile";
};
