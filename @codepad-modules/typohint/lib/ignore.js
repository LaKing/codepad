module.exports = function ignore(file, line, word, dbname) {

    if (!file) return ß.err("undefined file");
    if (!line) return ß.err("undefined line " + file);
    if (!word) return ß.err("undefined word " + file);
    if (!dbname) return ß.err("undefined dbname " + file);

    if (!ß.typohint_ignore[dbname]) ß.typohint_ignore[dbname] = {};
    if (!ß.typohint_ignore[dbname][file]) ß.typohint_ignore[dbname][file] = {};
    ß.typohint_ignore[dbname][file][word] = line;

    ß.lib.typohint.save_ignore();
};
