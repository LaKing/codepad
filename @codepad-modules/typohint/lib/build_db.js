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
    var db = ß.path.extname(file).substring(1);
    // evaluate code blocks
    if (!ß.typohint_db[db]) ß.typohint_db[db] = {};
    if (ext === "js") return process_js_block(file, data);
    process_data(strip(data), ß.typohint_db[db]);
}

function process_js_block(file, data) {
    if (data.charAt(0) === "#") data = "//" + data;
  	console.log(file);
    let tokens = [];
  	try {
        tokens = esprima.tokenize(data);
    } catch (err) {
      	console.log("Can not tokenize", file);
        //console.log(err);
        return;
    }
    for (let i in tokens) {
        let type = tokens[i].type;
        // if type is Numeric Keyword or Punctuator, then we are good.
        if (type === "Identifier") process_word(tokens[i].value, ß.typohint_db["js-Identifier"]);
        if (type === "String") process_data(tokens[i].value, ß.typohint_db["js-String"]);
    }
}
/*
function process_contents_block(data, db) {
    const lines = data.split("\n");

    for (let l in lines) {
        //console.log('--', l, lines[l]);
        process_data(lines[l], db);
    }
}
*/

function process_data(data, db) {
    const arr = data.replace(/[^a-zA-Z0-9_íÍöÖüÜóÓőŐúÚéÉáÁűŰ]+/g, " ").split(" ");

    for (let a in arr) {
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
