module.exports = function (socket) {
    socket.on("exec", function (arg) {
        if (arg !== push) return;

        for (let file in ß.projectfiles) {
            ß.lib.typohint.evaluate_file(file);
        }

        setTimeout(ß.lib.typohint.build_db, 5000);
    });
};
