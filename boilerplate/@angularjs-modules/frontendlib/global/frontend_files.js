/*ßoilerplate */

const fs = ß.fs;

if (!ß.frontend_files) ß.frontend_files = {};

var log = "";
const logfile = ß.BPLOG + "/frontend.log";

function reg(msg) {
    //ß.debug(msg);
    log += msg + "\n";
}

// bmf is the boilerplate-modules folder we are processing now
function load_module_frontend_dir(module, dir, bmf) {
    //  we need an object that has keys representing the frontend file, and value representing the path
    let path = dir + "/" + bmf;
    if (fs.isDirSync(path)) {
        let files = fs.readdirSync(path);
        for (let i = 0; i < files.length; i++) {
            if (fs.lstatSync(path + "/" + files[i]).isFile()) {
                let file = files[i];
                if (!ß.frontend_files[file]) {
                    ß.frontend_files[file] = path + "/" + files[i];
                    reg(file + " " + path + "/" + files[i]);
                }
            }
            // TODO if a directory?
        }
    }
}

if (!ß.load_fronted_files)
    ß.load_frontend_files = function(bmf) {
        reg("// ------------------- " + bmf + " ----------------------");

        for (let module in ß.modules) {
            // priority
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === true) load_module_frontend_dir(module, dir, bmf);
            }
        }

        for (let module in ß.modules) {
            // standard
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === false) load_module_frontend_dir(module, dir, bmf);
            }
        }

        fs.writeFileSync(logfile, log);
        console.log("- " + bmf + " frontend_files registered");
    };

ß.load_frontend_files("public");
ß.load_frontend_files("static");

if (!ß.get_frontend_files)
    ß.get_frontend_files = function() {
        return Object.keys(ß.frontend_files);
    };
