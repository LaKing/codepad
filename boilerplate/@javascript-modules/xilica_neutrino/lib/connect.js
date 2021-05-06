const net = require("net");

//var os = require( 'os' );
//var networkInterfaces = os.networkInterfaces( );
//console.log( networkInterfaces );

module.exports = function connect_device(name) {
    var local_address = ß.HOST_IP || "0.0.0.0";
    var device_ip = ß.NEUTRINO_DEVICES[name] || ß.NEUTRINO_DEVICE_IP;
    var device_port = 10007;
    var n = Object.keys(ß.NEUTRINO_DEVICES).indexOf(name);
    var device_localPort = 2000 + n;

    try {
        device = new net.Socket();

        device.setEncoding("ascii");
      
        device.on("error", function(err) {
            console.log("ERROR on", name, err);
        });
      
        device.on("data", function(data) {
            //console.log(name, ' Neutrino: ' + data);

            ß.lib.xilica_neutrino.update_data_value(name, data);
        });

        device.on("close", function() {
            console.log("Connection closed to xilica " + name);
        });

        console.log("device connect ", name, device_ip, device_port, local_address, device_localPort);

        device.connect(
            {
                port: device_port,
                host: device_ip,
                localAddress: local_address,
                localPort: device_localPort
            },
            function() {
                console.log("device connected", name);
                ß.NEUTRINO_CONNECTIONS[name] = device;
            }
        );
    } catch (err) {
        console.log("connect_device", err);
        console.log("Connecting call to device failed.", name);
    }
};
