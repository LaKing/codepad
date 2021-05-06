
module.exports = function(socket) {
    // on connection
    socket.on("neutrino_ctl", function(data) {
        let device = data.device;
        let control = data.control;
        let command = data.cmd;
      
		ß.lib.xilica_neutrino.command(data.device, data.control, data.cmd, function(err) {
        	if (err) return socket.emit('neutrino_ctl_error', {
              message: err.message,
              device: device,
              control: control
            });
        }); 
   
    });
};