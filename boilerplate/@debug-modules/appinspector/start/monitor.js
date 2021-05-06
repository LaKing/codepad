const exec = require("child_process").exec;



var os = require('os');


function execute(command, callback) {
    exec(command, function (error, stdout, stderr) {
        callback(stderr, stdout);
    });
}

let cmd = "ps -fp " + process.pid + " -o %cpu,%mem,cmd | sed 1d | awk '{print $1}'";

let prevmem = 1;

function loop() {
    execute(cmd, (err, value) => {
        let memused = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        let cpu = Math.round(Number(value));
        let osload = os.loadavg();
        let syscpu = Math.round(osload[0]);

        if (cpu > ß.APPINSPECTOR_CPUTHRESHOLD && ß.appinspector_num_cpudumps <= ß.APPINSPECTOR_MAX_NUM_CPUDUMP) {
            ß.appinspector_num_cpudumps++;
            ß.lib.appinspector.cpuprofiler(cpu,syscpu);
        }
        if (memused > ß.APPINSPECTOR_MEMTHRESHOLD && ß.appinspector_num_memdumps <= ß.APPINSPECTOR_MAX_NUM_MEMDUMP) {
            let diff = (memused / prevmem - 1) * 100;
            if (ß.APPINSPECTOR_DIFFBETWEEN_MEMDUMPS < diff) {
                prevmem = memused;
                ß.appinspector_num_memdumps++;
                ß.lib.appinspector.memoryprofiler(memused);
            }
        }

        //ß.debug(`@Appinspector: syscpu:${syscpu}% pcpu:${cpu}% heapmemory:${memused}MB`);
        
        /*
        console.log("memory", process.memoryUsage());
		console.log("cpu", process.cpuUsage(startUsage));
		console.log("loadavg", os.loadavg());
        */
    });
}
setTimeout(function () {
    setInterval(loop, ß.APPINSPECTOR_MONITORFREQ);
}, ß.APPINSPECTOR_STARTUPTIME_WAIT);

//setInterval(loop, ß.APPINSPECTOR_MONITORFREQ);
