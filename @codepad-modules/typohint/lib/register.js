// TODO zths file should be better called register

module.exports = function (file, pos, word, ws, dbname) {
    if (!file) return ß.err("undefined file");
    if (!pos) return ß.err("undefined pos " + file);
    if (!word) return ß.err("undefined word " + file);
    if (!ws) return ß.err("undefined ws " + file);
    if (!dbname) return ß.err("undefined dbname " + file);

    if (ß.typohint_ignore[dbname]) if (ß.typohint_ignore[dbname][file]) if (ß.typohint_ignore[dbname][file][word]) return;

    if (!ß.projectfiles[file].typohint) return;
    ß.projectfiles[file].typohint.push({
        line: Number(pos),
        word: word,
        wsdb: ws,
        dbname: dbname,
    });

    // verbal notification in logs

    var biggest_key = "";
    var biggest_value = 0;
    var all_words = "";
    for (let w in ws) {
        if (ws[w] > biggest_value) {
            biggest_key = w;
            biggest_value = ws[w];
        }

        all_words += " | " + w;
    }
    //console.log(word + " -> " + biggest_key + " ? " + dbname + " " + file + ":" + pos + " [ " + all_words.substring(3) + " ]");
};
