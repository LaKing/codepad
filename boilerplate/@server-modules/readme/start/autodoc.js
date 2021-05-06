if (process.argv.indexOf("--restart-server") >= 0) return;

if (ß.DEBUG) return ß.debug("- Autodoc readme generation disabled in debug mode.");

/*ßoilerplate */

/* @DOC

	This module generates a readme automatically from comments that are marked with the `@DOC` tag at start.
    Both, single-line and multiline comments are supported. When the project is started source files are parsed and marked document comment blocks extracted.

*/

const TAG = "`";

var extract = require("extract-comments");

const fs = ß.fs;

function path_to_mdlink(filepath, line) {
    let file = filepath.split("/").pop();
    if (!line) line = 1;
    let path = filepath;
    if (filepath.substring(0, ß.CWD.length) === ß.CWD) {
        path = filepath.substring(ß.CWD.length);
        if (ß.MODE !== "production") return "\n\n[`" + file + ":" + line + "`](" + ß.EDITOR_LINKBASE + path + "?line=" + line + ")\n\n";
    }
    if (line === 1) return "\n\n[`" + path + "`]\n\n";
    return "\n\n[`" + path + " line " + line + "`]\n\n";
}

function extract_doc(file) {
    let d = "";
    let content = fs.readFileSync(file, "UTF8");
    let comment = extract(content);
    for (let c in comment) {
        if (comment[c].value.substring(0, 5).trim() === "@DOC") {
            let it = comment[c].value.substring(5).trim();
            // add md-newline markup to each end of line.
            let me = it.split("\n").join("  \n");
            d += me + "\n";
            if (me.length > 0) d += path_to_mdlink(file, comment[c].loc.start.line);
        }
    }
    return d;
}

function traverse(path) {
    let d = "";

    if (fs.isDirSync(path)) {
        if (
            path
                .split("/")
                .pop()
                .indexOf("modules") >= 0
        )
            return "";
        if (path.split("/").pop() === "static") return "";
        if (path.split("/").pop() === ".git") return "";
        if (path.split("/").pop() === "boilerplate") return "";

        let content = fs.readdirSync(path);
        for (let c in content) {
            d += traverse(path + "/" + content[c]);
        }
    }
    if (fs.isFileSync(path)) {
      	// TODO - add options for other files, eg. vue
        if (path.split(".").pop() !== "js") return "";
        d += extract_doc(path);
    }
    return d;
}

function boilerplate_folders(path) {
    let d = "";

    if (fs.isDirSync(path)) {
        let content = fs.readdirSync(path);
        for (let c in content) {
            d += boilerplate_files(path, content[c]);
        }
    }
    return d;
}

function boilerplate_files(path, dirname) {
    let d = "";
    if (dirname.split("/").pop() === ".git") return "";
    if (dirname.split("/").pop() === "node_modules") return "";

    if (!fs.existsSync(path + "/" + dirname)) return "";
    let dir = path + "/" + dirname;
    if (fs.isDirSync(dir)) {
        let content = fs.readdirSync(dir);
        for (let c in content) {
            d += " - " + content[c] + "\n";
        }
    }
    if (d.length > 0) return "" + dirname + "\n" + d;
    return d;
}

function readme_file(filepath) {
    d = "";
    // read the module README.EN.md
    if (fs.existsSync(filepath)) {
        d += fs.readFileSync(filepath);
        d += "\n";
        d += path_to_mdlink(filepath);
    }
    return d;
}

function load_module_doc(module, dir) {
    let d = "";
    // title
    if (ß.modules[module][dir] === true) d += "## The " + module + " module";
    if (ß.modules[module][dir] === false) d += "## The @" + module + " module";

    d += "\n";
    d += "#### " + dir.substring(ß.CWD.length) + "\n";
    d += traverse(dir);

    // read the module README.EN.md
    d += readme_file(dir + "/README.EN.md");

    // add some obviouse data, like hooks and libs in the filesystem
    d += "<pre>\n" + boilerplate_folders(dir) + "</pre>\n\n";

    // Write to local module - if posible
    try {
        ß.fs.writeFileSync(dir + "/README.md", d);
    } catch (err) {}

    return d;
}

let doc = "";

// read the module README.EN.md
doc += readme_file(ß.CWD + "/README.EN.md");

// read the boilerplate README.EN.md
doc += readme_file(ß.BPD + "/README.EN.md");

// autodoc the global boilerplate loader
doc += traverse(ß.BPD + "/loader");

// proceed to the active modules
doc += "# Module's Documentation\n\n";

for (let module in ß.modules) {
    // priority
    for (let dir in ß.modules[module]) {
        if (ß.modules[module][dir] === true) doc += load_module_doc(module, dir);
    }

    // standard
    for (let dir in ß.modules[module]) {
        if (ß.modules[module][dir] === false) doc += load_module_doc(module, dir);
    }

    doc += "\n\n";
}

var showdown = require("showdown");
var converter = new showdown.Converter();
//var text = ß.fs.readFileSync(ß.CWD + '/README.md', 'UTF-8');
var html = converter.makeHtml(doc);
ß.fs.writeFileSync(ß.CWD + "/README.md", doc);
ß.fs.writeFileSync(ß.CWD + "/README.html", html);
