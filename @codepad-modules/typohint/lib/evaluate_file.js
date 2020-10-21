const strip = require("strip-comments");
const esprima = require("esprima");
const Tokenizer = require("html-tokenizer");

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
            process_file_contents(file, contents);
        });
};

function process_file_contents(file, data) {
    // get extension and code blocks
    var ext = ß.path.extname(file).substring(1);
    var db = ß.path.extname(file).substring(1);
    // evaluate code bloacks
    if (!ß.typohint_db[db]) ß.typohint_db[db] = {};
    // simple js
    if (ext === "js") {
        if (data.charAt(0) === "#") return process_js_block(file, 0, "//" + data);
        return process_js_block(file, 0, data);
    }
    // html mixed with js, css
    if (ext === "vue" || ext === "ejs" || ext === "html") return process_mixed_block(file, 0, data);
    // other code
    process_contents_block(file, 0, strip(data, { preserveNewlines: true }), db);
}

function process_js_block(file, offset, data) {
    let tokens = [];
    try {
        tokens = esprima.tokenize(data, { loc: true });
    } catch (err) {
        console.log("Can not tokenize", file);
        return;
    }

    for (let i = 0; i < tokens.length; i++) {
        let type = tokens[i].type;
        // if type is Numeric Keyword or Punctuator, then we are good.
        // esprima uses linenumbers 1...n but we use in this file 0..n numbering
        let pos = offset + Number(tokens[i].loc.start.line - 1);
        if (type === "Identifier") evaluate_word(file, pos, tokens[i].value, "js-Identifier");
        if (type === "String") evaluate_contents(file, pos, tokens[i].value, "js-String");
    }
}

function process_mixed_block(file, offset, data) {
    // we should use some tokenizer, but could not find one yet, so we use this quick and dirty way
    // we have vue files and html files in mind ...
    // we will split to lines and build blocks
    const lines = data.split("\n");

    var current_block = "";
    var current_dbname = "html";
    var current_offset = offset;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === "<script>") {
            process_contents_block(file, current_offset, current_block, current_dbname);
            current_block = "";
            current_dbname = "js";
            current_offset = i + 1;
            continue;
        }
        if (lines[i] === "</script>") {
            process_js_block(file, current_offset, current_block, current_dbname);
            current_block = "";
            current_dbname = "html";
            current_offset = i + 1;
            continue;
        }
        if (lines[i] === "<style scoped>" || lines[i] === "<style>") {
            process_contents_block(file, current_offset, current_block, current_dbname);
            current_block = "";
            current_dbname = "css";
            current_offset = i + 1;
            continue;
        }
        if (lines[i] === "</style>") {
            process_contents_block(file, current_offset, current_block, current_dbname);
            current_block = "";
            current_dbname = "html";
            current_offset = i + 1;
            continue;
        }
        current_block += lines[i] + "\n";
    }
}

function process_contents_block(file, offset, data, dbname) {
    const lines = data.split("\n");
    for (let i = 0; i < lines.length; i++) {
        evaluate_contents(file, Number(offset + i), lines[i], dbname);
    }
}
const regex = /[^a-zA-Z0-9_íÍöÖüÜóÓőŐúÚéÉáÁűŰ]+/g;
function evaluate_contents(file, pos, data, dbname) {
    const arr = data.replace(regex, " ").split(" ");

    for (let a = 0; a < arr.length; a++) {
        let w = arr[a];
        if (w.length < 3) continue;
        if (w.length > 30) continue;
        if (!isNaN(w)) continue;
        //if (keywords.indexOf(w) >= 0) continue;
        evaluate_word(file, pos, w, dbname);
    }
}

function evaluate_word(file, pos, e, dbname) {
    let db = ß.typohint_db[dbname];
    if (e.length < 3) return;
    // if the word is more then once in the db, we can't consider it a typo
    if (db[e]) if (db[e] > 1) return;
    if (ß.typohint_db.project[e]) return;
    var ws = {};
    for (let w in db) {
        if (is_similar(e, w) === true) ws[w] = db[w];
    }
    if (Object.keys(ws).length < 1) return;

    if (e.match(/^\d/)) return;

    ß.lib.typohint.register(file, 1 + pos, e, ws, dbname);
}

function is_similar(a, b) {
    // if the two are equal they are not similar but equal
    if (a === b) return false; // "same";
    if (length_missmatch(a, b)) return false; // "length missmatch";

    if (a.length === b.length) return accepted_samelength(a, b);
    if (a.length > b.length) return accepted_longer_a(a, b);
    if (a.length < b.length) return accepted_longer_a(b, a);
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
