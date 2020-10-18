//

const strip = require("strip-comments");
const esprima = require("esprima");

module.exports = function () {
    for (let i in ß.projectfiles) {
        var file = ß.projectfiles[i].realpath;
        if (ß.projectfiles[i].file) load(file);
    }

    setTimeout(ß.lib.typohint.save_db, 5000);
};

function load(file) {
    process_data(file, ß.typohint_db.project);

    var ext = ß.path.extname(file).substring(1);
    if (ß.typohint_extensions.split(" ").indexOf(ext) >= 0)
        ß.fs.readFile(file, "utf8", function (err, contents) {
            if (err) return đ(err);
            if (contents.length > 10000) return;
            process_file_contents(file, contents);
        });
}

function process_file_contents(file, data) {
    // get extension and code blocks
    var ext = ß.path.extname(file).substring(1);
    // evaluate code blocks
    if (ext === "js") {
        if (data.charAt(0) === "#") return process_js_block("//" + data);
        return process_js_block(data);
    }
    if (ext === "vue" || ext === "ejs" || ext === "html") return process_mixed_block(data);

    process_contents_block(strip(data), ext);
}

function process_js_block(data) {
    let tokens = [];
    try {
        tokens = esprima.tokenize(data);
    } catch (err) {
        console.log("Can not tokenize", file);
        //console.log(err);
        return;
    }
    for (let i = 0; i < tokens.length; i++) {
        let type = tokens[i].type;
        // if type is Numeric Keyword or Punctuator, then we are good.
        if (type === "Identifier") process_word(tokens[i].value, ß.typohint_db["js-Identifier"]);
        if (type === "String") process_data(tokens[i].value, ß.typohint_db["js-String"]);
    }
}

function process_contents_block(data, dbname) {
    if (!ß.typohint_db[dbname]) ß.typohint_db[dbname] = {};
    process_data(data, ß.typohint_db[dbname]);
}

function process_mixed_block(data) {
    // we should use some tokenizer, but could not find one yet, so we use this quick and dirty way
    // we have vue files and html files in mind ...
    // we will split to lines and build blocks
    const lines = data.split("\n");

    var current_block = "";
    var current_dbname = "html";
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === "<script>") {
            process_contents_block(current_block, current_dbname);
            current_block = "";
            current_dbname = "js";
            continue;
        }
        if (lines[i] === "</script>") {
            process_js_block(current_block, current_dbname);
            current_block = "";
            current_dbname = "html";
            continue;
        }
        if (lines[i] === "<style scoped>" || lines[i] === "<style>") {
            process_contents_block(current_block, current_dbname);
            current_block = "";
            current_dbname = "css";
            continue;
        }
        if (lines[i] === "</style>") {
            process_contents_block(current_block, current_dbname);
            current_block = "";
            current_dbname = "html";
            continue;
        }
        current_block += lines[i] + "\n";
    }
}

function process_data(data, db) {
    const arr = data.replace(/[^a-zA-Z0-9_íÍöÖüÜóÓőŐúÚéÉáÁűŰ]+/g, " ").split(" ");

    for (let a = 0; a < arr.length; a++) {
        let w = arr[a];
        if (w.length < 3) continue;
        if (w.length > 30) continue;
        if (!isNaN(w)) continue;
        process_word(w, db);
    }
}

function process_word(w, db) {
    if (!db[w]) db[w] = 0;
    db[w] = db[w] + 1;
}
