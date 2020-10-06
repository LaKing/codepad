// TODO zths file should be better called register

module.exports = function (file, pos, e, ws) {
    if (!ß.projectfiles[file].typohint) return Ł(file, ß.projectfiles[file]);
    ß.projectfiles[file].typohint.push({
        line: Number(pos),
        word: e,
        wsdb: ws,
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

        all_words += ' | ' + w;
    }
    console.log(e + " -> " + biggest_key + " ? " + file + ":" + pos + " [ " + all_words.substring(3) + " ]");
};
