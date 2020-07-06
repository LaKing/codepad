const fs = ß.fs;

/* @DOC 
## Module chain
Chains are async functions that are executed sequentially by calling `ß.run_chain`.
chains are defined with `module.exports = async function(arguments)` within js files with the naming schema `module/chains/chainname.function-name.js`
The chainname is the reference for the call, the function-name should be a descriptive custom name, programatically not used.
As always, chains definied within the project-modules take precedence over @*-modules. Chains may have multiple arguments.
Chain functions should return an object, that consists of the outputs each result of the execution chain.
*/


var log = "";
const logfile = ß.BPLOG + "/chain.log";

function reg(msg) {
    //ß.debug(msg);
    log += msg + "\n";
}

// bmf is the boilerplate-modules folder we are processing now
function load_module_chains(module, dir, that) {
    // that is the object that has keys representing the file, and value representing the path
  
  	if (ß.DEBUG)
    if (fs.isDirSync(dir + "/chain")) console.log("WARNING wrong naming, please use " + dir + "/chains");

  
    let path = dir + "/chains";
    if (fs.isDirSync(path)) {
        let files = fs.readdirSync(path);
        for (let i = 0; i < files.length; i++) {
            if (files[i].split(".").pop() === "js") {
                let file = files[i];
                if (!that[file]) that[file] = path + "/" + files[i];
            }
        }
    }
}

if (!ß.load_chains)
    ß.load_chains = function(modules) {
        ß.debug("- Load chains ...");
        
        if (!ß.chains) ß.chains = {};
        let that = {};
        for (let module in modules) {
            // priority
            for (let dir in modules[module]) {
                if (modules[module][dir] === true) load_module_chains(module, dir, that);
            }
        }
        for (let module in modules) {
            // standard
            for (let dir in modules[module]) {
                if (modules[module][dir] === false) load_module_chains(module, dir, that);
            }
        }
        // that object has values populated, selection complete so do the job now
        for (let me in that) {
            let file = that[me];
            let chain = me.split(".")[0];
            let name = me.split(".")[1];
          	let ext =  me.split(".")[2];
          	if (!name || !ext || ext !== 'js') return console.log("WARNING Chain file naming error. Please look at " + me);
            if (!ß.chains[chain]) ß.chains[chain] = {};
            if (!ß.chains[chain][name]) ß.chains[chain][name] = require(file);
            reg(chain + " " + name + " is " + file);
        }

        fs.writeFileSync(logfile, log);
        ß.fs.chownSync(logfile, ß.UID, ß.GID);
        //ß.debug('-  Load chains complete');
    };

if (!ß.run_chain)
    ß.run_chain = async function(chain, arg) {
      	let results = {};
        if (ß.chains[chain])
            for (var h in ß.chains[chain]) {
                try {                   
                    const a = [...arguments].splice(1);
                    if (typeof ß.chains[chain][h] === 'function') result = await ß.chains[chain][h](...a);
                    else console.log(ß.chains[chain][h] + " is not a function. chain:" + chain + " h:" +h);
                  Ł(h);
                  	results[h] = result;
                } catch (error) {
                    Đ(error);
                    throw error;
                }
            }
      	return results;
    };

