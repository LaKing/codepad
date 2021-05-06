module.exports = function (memusage) {
    let fs = require("fs");
    let profiler = require("v8-profiler-next");
    let _datadir = ß.APPINSPECTOR_SAVEDIR;
    let id = ß.date() + "_" + ß.time();
    let name = id + "-memusage:" + memusage + "MB.heapsnapshot";
    let nextMBThreshold = 20;
    function tickHeapDump() {
        setImmediate(function () {
            heapDump();
        });
    }

    function heapDump() {
        let memMB = process.memoryUsage().rss / 1048576;

        if (memMB > nextMBThreshold) {
            nextMBThreshold += 50;
            let snap = profiler.takeSnapshot("profile");
            saveHeapSnapshot(snap, _datadir);
        }
    }

    function saveHeapSnapshot(snapshot, datadir) {
        let buffer = "";
        let date = new Date();
        let stamp = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
        snapshot.serialize(
            function iterator(data, length) {
                buffer += data;
            },
            function complete() {
                fs.writeFile(datadir + "/" + name, buffer, function () {
                    ß.debug("@Appinspector: Heap snapshot written to " + name);
                });
            }
        );
    }
    tickHeapDump();
};
