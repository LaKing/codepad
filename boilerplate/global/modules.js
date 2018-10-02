/*jshint esnext: true */

const fs = ß.fs;

// @DOC ## ßoilerplate/global/modules.js
// @DOC ß.modules contains all the modules that we use
// @DOC In DEBUG mode, we can define active-modules that run only in this mode

if (!ß.modules) ß.modules = {};


function process(dir, p) {
    if (!fs.lstatSync(dir).isDirectory()) return;
    let modules = ß.modules;
    let that = fs.readdirSync(dir);
    for (let m in that) {
        let module = that[m];
        let path = fs.realpathSync(dir + '/' + module);
        if (fs.lstatSync(path).isDirectory()) {

            let condition_file = path + '/module-condition.js';
            if (fs.existsSync(condition_file))
                if (require(condition_file)() !== true) continue;

            if (!modules[module]) modules[module] = {};
            modules[module][path] = p;

            ß["USE_" + module.toUpperCase()] = true;
        }
    }

}

    // the CWD is a module with priority
    var curr = ß.CWD.split('/').pop();
    if (!ß.modules[curr]) ß.modules[curr] = {};
    ß.modules[curr][ß.CWD] = true;


// construct the modules object
function get_modules(modules_root) {
    if (!fs.lstatSync(modules_root).isDirectory()) return ß.debug(modules_root + ' is not a directory!');

    var modules = ß.modules;
    // process modules in CWD
    var cwd = fs.readdirSync(modules_root);

    // module folders either have priority or not.
    // if there is no @ character prefixing the directory, it has priority
    // standard libs should be prefixed with @ and can be symlinks


    // first of all search for non-@ modules
    for (let f in cwd) {
        let dir = fs.realpathSync(modules_root + '/' + cwd[f]);
        let d = cwd[f];
        if (d.indexOf('-modules') >= 0 || d === 'modules') {
            if (d[0] !== '@') process(dir, true);
        }
    }

    // then search for boilerplate @-modules.
    for (let f in cwd) {
        let dir = fs.realpathSync(modules_root + '/' + cwd[f]);
        let d = cwd[f];
        if (d.indexOf('-modules') >= 0 || d === 'modules') {
            if (d[0] === '@') process(dir, false);
        }
    }
}

get_modules(ß.MRD);


fs.mkdirpSync(ß.VAR + '/debug');
var config_file = ß.VAR + '/debug/modules.json';
fs.writeFileSync(config_file, JSON.stringify(ß.modules, null, 4));
console.log("- wrote modules to", config_file);

// get_path from any file. Honor priority
if (!ß.get_module_path)
    ß.get_module_path = function(module, path) {
        // get file or folder
      	if (!path) path = '';

        for (let me in ß.modules[module]) {
            if (ß.modules[module][me])
                if (fs.existsSync(me + '/' + path)) return me + '/' + path;
        }
        for (let me in ß.modules[module]) {
            if (!ß.modules[module][me])
                if (fs.existsSync(me + '/' + path)) return me + '/' + path;
        }
        return undefined;
    };


/*

// these are now obsolete. use symlinks and collections-of-modules

////////////////////////////////////////CLI/////////////////////////////////////////////////

ß.cli_commands.push('blacklist MODULE');
if (ß.CMD === 'blacklist') {
    if (ß.fs.existsSync(ß.BPM + '/' + ß.ARG) || ß.fs.existsSync(ß.CPM + '/' + ß.ARG)) {
        blacklist.push(ß.ARG.toLowerCase());
        fs.writeJsonSync(blacklist_file, blacklist);
        ß.msg('OK');
        process.exit();
    }
}

ß.cli_commands.push('whitelist MODULE');
if (ß.CMD === 'whitelist') {
    if (ß.fs.existsSync(ß.BPM + '/' + ß.ARG) || ß.fs.existsSync(ß.CPM + '/' + ß.ARG)) {
        blacklist.splice(blacklist.indexOf(ß.ARG.toLowerCase()), 1);
        fs.writeJsonSync(blacklist_file, blacklist);
        ß.msg('OK');
        process.exit();
    }
}

*/
//console.log("ß.modules:", ß.modules);