/* js-beautify */

module.exports = function (socket) {
    const username = ß.lib.basicauth.username_by_socket(socket);
    socket.on("typohint", function (projectfile, callback) {
      
        const settings = ß.lib.codepad.get_settings(username);
        if (settings.TYPOHINT !== true) return; 
          
        if (!projectfile) projectfile = socket.projectfile;
        if (projectfile.charAt(0) !== "/") return console.error("Cannot typohint. Bad path.");
        if (!projectfile) return console.error("Cannot typohint. No parameter.");
        if (!ß.projectfiles[projectfile]) return console.error("Cannot typohint. No such projectfile: " + projectfile);
        if (!ß.projectfiles[projectfile].realpath) return console.error("Cannot typohint. No realpath for projectfile: " + projectfile);

        ß.lib.typohint.evaluate_file(projectfile);

        setTimeout(function () {
            socket.emit("typohint", ß.projectfiles[projectfile].typohint);
        }, 1000);
    });
};
