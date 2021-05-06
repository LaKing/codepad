//

const ping = require("ping");
const cfg = {
    timeout: 1
    // WARNING: -i 2 may not work in other platform like window
    //extra: ["-i 2"],
};

function run_ping() {
    var hosts = ["google.com"];
    hosts.forEach(function(host) {
        ping.sys.probe(
            host,
            function(isAlive) {
                var msg = isAlive ? "host " + host + " is alive" : "host " + host + " is dead";
                if (ß.MAIN.IS_ONLINE !== isAlive) {
                  ß.msg(msg);
                  ß.MAIN.IS_ONLINE = isAlive;                                 
                }
              
            } //	,
            //cfg
        );
    });
}

setInterval(run_ping, 3000);
