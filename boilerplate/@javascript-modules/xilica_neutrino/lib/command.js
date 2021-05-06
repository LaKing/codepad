module.exports = function(device_name, control, cmd, callback) {

  	if (!ß.NEUTRINO_CONNECTIONS[device_name]) return callback(new Error(device_name + ' not connected'));
  
    var command;

    //if (increase or decrease)
    if (cmd === 'INC' || cmd === 'DEC') command = cmd + " " + control + " 1";

  	//
    if (cmd === true) command = "SET " + control + " TRUE";
    if (cmd === false) command = "SET " + control + " FALSE";

    try {
        ß.NEUTRINO_CONNECTIONS[device_name].write(command + "\r", "ascii", function() {
            console.log("command: " + command);
          	callback(null);
        });
    } catch (err) {
        console.log("controll_xilica_value", err);
        callback(err);
    }
};
