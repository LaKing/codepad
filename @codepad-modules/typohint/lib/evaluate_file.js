const strip = require("strip-comments");
const esprima = require("esprima");

module.exports = function evaluate_file(file) {
  	if (!ß.projectfiles[file]) return;
    var ext = ß.path.extname(file).substring(1);
    if (ß.typohint_extensions.split(" ").indexOf(ext) < 0) return;
	if (ß.projectfiles[file].readonly) return;
  	if (ß.projectfiles[file].size > 10000) return;
  
  	ß.projectfiles[file].typohint = [];
  	if (ß.projectfiles[file].realpath)
  	ß.fs.readFile(ß.projectfiles[file].realpath, "utf8", function (err, contents) {
        if (err) return đ(err);
        // we have a limit on file size under the files to be considered
        if (contents.length > 10000) return;
        evaluate_file_contents(file, contents);
    });
};

function evaluate_file_contents(file, data) {
    // get extension and code blocks
    var ext = ß.path.extname(file).substring(1);
    var db = ß.path.extname(file).substring(1);
    // evaluate code bloacks
    if (!ß.typohint_db[db]) ß.typohint_db[db] = {};
    if (ext === "js") return evaluate_js_block(file, data);
    evaluate_contents_block(file, 0, strip(data, { preserveNewlines: true }), ß.typohint_db[db]);
}

function evaluate_js_block(file, data) {
    if (data.charAt(0) === "#") data = "//" + data;
    const tokens = esprima.tokenize(data, { loc: true });
    for (let i in tokens) {
        let type = tokens[i].type;
        // if type is Numeric Keyword or Punctuator, then we are good.
        let pos = tokens[i].loc.start.line;

        if (type === "Identifier") evaluate_word(file, pos, tokens[i].value, ß.typohint_db["js-Identifier"]);
        if (type === "String") evaluate_contents(file, pos, tokens[i].value, ß.typohint_db["js-String"]);
    }
}

function evaluate_contents_block(file, offset, data, db) {
    const lines = data.split("\n");

    for (let pos in lines) {
        evaluate_contents(file, offset + pos, lines[pos], db);
    }
}

function evaluate_contents(file, pos, data, db) {
    const arr = data.replace(/[\W]+/g, " ").split(" ");

    for (let a in arr) {
        let w = arr[a];
        if (w.length < 3) continue;
        if (w.length > 30) continue;
        if (!isNaN(w)) continue;
        //if (keywords.indexOf(w) >= 0) continue;
        evaluate_word(file, pos, w, db);
    }
}

function evaluate_word(file, pos, e, db) {
    if (e.length < 3) return;
    // if the word is more then once in the db, we can't consider it a typo
    if (db[e]) if (db[e] > 1) return;
  	if (ß.typohint_db.project[e]) return;
    var ws = {};
    for (let w in db) {
        if (is_similar(e, w) === true) ws[w] = db[w];
    }
    if (Object.keys(ws).length < 1) return;
    ß.lib.typohint.notify(file, pos, e, ws);
}

function is_similar(a, b) {
    // if the two are equal they are not similar but equal
    if (a === b) return false; // "same";
    if (length_missmatch(a, b)) return false; // "length missmatch";

    if (a.length === b.length) return accepted_samelength(a, b);
    if (a.length > b.length) return accepted_longer_a(a, b);
    if (a.length < b.length) return accepted_longer_a(b, a);

    return console.log("CHECK:", a, b);
}

function length_missmatch(a, b) {
    // we consider only words that are close in length
    return Math.abs(a.length - b.length) > 1;
}

// works on equal length string
function accepted_samelength(a, b) {
    var n = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            n++;
            // n is the number of errors
            if (n > 1) return false; // "samelength-differences-high";
        }
    }

    return true;
}

function accepted_longer_a(a, b) {
    var bx = false;
    for (let i = 0; i < a.length; i++) {
        if (bx) if (a[i] !== b[i - 1]) return false; // "longer-stringmissmatch";

        if (!bx) if (a[i] !== b[i]) bx = true;
    }
    return true;
}
