module.exports = function evaluate_projectfiles() {
    if (ß.projectfiles)
        for (let file in ß.projectfiles) {
            ß.lib.typohint.evaluate_file(file);
        }
};
