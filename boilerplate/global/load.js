/*jshint esnext: true */

const fs = ß.fs;

// @DOC ## ßoilerplate/global/load.js
// @DOC Simply requiring files
// @DOC Passing a 'dir' as an argument to ß.load()
// @DOC It will load all the files in 'dir', first in our modules folder - if that not exists, it will use ßoilerplate/modules


function list_files(module, dir, bmf) {

    let folder = dir + '/' + bmf;
    if (fs.existsSync(folder)) {
        let path = fs.realpathSync(folder);
        if (fs.lstatSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            for (let i = 0; i < files.length; i++) {
                if (files[i].split('.').reverse()[0] === 'js') {
                    require(path + '/' + files[i]);
                    reg(path + '/' + files[i]);
                }
            }
        }
    }
}


var log = '';
const logfile = ß.VAR + '/debug/load.log';

function reg(msg) {
    //ß.debug(msg);
    log += msg + '\n';
}

// bmf is the boilerplate-modules folder we are processing now
function load_module_dir(module, dir, bmf, that) {
    // that is the object that has keys representing the file, and value representing the path
    let folder = dir + '/' + bmf;
    if (fs.existsSync(folder)) {
        let path = fs.realpathSync(folder);
        if (fs.lstatSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            for (let i = 0; i < files.length; i++) {
                if (files[i].split('.').reverse()[0] === 'js') {
                    let file = files[i];
                    if (!that[file]) that[file] = path + '/' + files[i];
                }
            }
        }
    }
}


if (!ß.load)
    ß.load = function(bmf) {
        reg('// ------------------- ' + bmf + ' ----------------------');

      	// load per modules
      
        for (let module in ß.modules) {
            let that = {};

            // priority
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === true)
                    load_module_dir(module, dir, bmf, that);
            }

            // standard
            for (let dir in ß.modules[module]) {
                if (ß.modules[module][dir] === false)
                    load_module_dir(module, dir, bmf, that);
            }

            // that object has values populated, selection complete so do the job now
            for (let me in that) {
                require(that[me]);
                reg(module + ' ' + bmf + ' ' + me + ' is ' + that[me]);
            }
        }
        fs.writeFileSync(logfile, log);
        console.log('- Load ' + bmf + ' complete');

    };