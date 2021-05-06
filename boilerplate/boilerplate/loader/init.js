/* @DOC 
## ßoilerplate related constants and variables

`ß.DEBUG` is a boolean constant
`ß.HOSTNAME` should be the FQDN hostname  
`ß.MRD` is the module root directory  
*/

if (!ß.DEBUG) {
    ß.DEBUG = false;
    if (process.argv[2] === "debug") {
        ß.DEBUG = true;
    }
}

if (ß.DEBUG) console.log("- ß.DEBUG", ß.DEBUG);
process.env.DEBUG = ß.DEBUG;

// constants
// @DOC `ß.CWD` stands for the Current Work Directory and refers to the project root.
if (!ß.CWD) ß.CWD = process.cwd();

// @DOC `ß.NAME` is a project name, by default the parent folder name of `CWD`
if (!ß.NAME) ß.NAME = ß.path.basename(ß.CWD);
process.env.NAME = ß.NAME;
console.log("- ß.NAME " + ß.NAME);

// UID and GID by default from the working directory
var stats = ß.fs.lstatSync(ß.CWD);
if (!ß.UID) ß.UID = stats.uid;
if (!ß.GID) ß.GID = stats.gid;

// @DOC `ß.BPD` is the Boilerplate Directory
if (!ß.BPD) ß.BPD = ß.path.dirname(__dirname);

// @DOC `CWD` should contain a `/version` file containing the build number as string. This should be incremented in every build.
if (!ß.BUILD_VERSION) {
    ß.BUILD_VERSION = "0.0.0";
    if (ß.fs.existsSync(ß.CWD + "/version"))
        ß.BUILD_VERSION = ß.fs
            .readFileSync(ß.CWD + "/version", "utf-8")
            .replace(/\r?\n?/g, "")
            .trim();
    else ß.fs.writeFileSync(ß.CWD + "/version", ß.BUILD_VERSION.toString());
}

// `ß.VAR` has the path for runtime variables eg.: `/var/codepad-project`
if (!ß.VAR) ß.VAR = ß.CWD + "/var"; //"/var/" + ß.NAME;
ß.fs.mkdirpSync(ß.VAR);
ß.fs.chownSync(ß.VAR, ß.UID, ß.GID);
process.env.VAR = ß.VAR;
console.log(" - ß.VAR", ß.VAR);

try {
    // we should remove it if it is not a symlink ...
    if (ß.fs.existsSync(ß.CWD + "/boilerplate.log")) ß.fs.removeSync(ß.CWD + "/boilerplate.log");
} catch (err) {
    console.log(err.code, err.syscall, err.path);
}

// We reset bplog every time.
if (!ß.BPLOG) ß.BPLOG = ß.VAR + "/boilerplate.log";
ß.fs.removeSync(ß.BPLOG);
ß.fs.mkdirpSync(ß.BPLOG);
ß.fs.chownSync(ß.BPLOG, ß.UID, ß.GID);

try {
    // needed to see logs in codepad
    if (!ß.fs.existsSync(ß.CWD + "/boilerplate.log")) ß.fs.symlinkSync(ß.BPLOG, ß.CWD + "/boilerplate.log", "dir");
} catch (err) {
    console.log(err.code, err.syscall, err.path);
}

// Global node modules directory
if (!ß.GND) ß.GND = process.config.variables.node_prefix + "/lib/node_modules/";
if (!ß.HOSTNAME) {
    ß.HOSTNAME = require("os").hostname();
    // hostname should be FQDN, if not, well, pre-set this value, or I assume its one of our containers .)
    if (ß.HOSTNAME.indexOf(".") < 0) ß.HOSTNAME += ".d250.hu";
} 

console.log(" - ß.HOSTNAME", ß.HOSTNAME);

// Modules Root Directory
if (!ß.MRD) ß.MRD = ß.CWD;
else {
    ß.fs.mkdirpSync(ß.MRD);
    ß.fs.chownSync(ß.MRD, ß.UID, ß.GID);
}
// Configs dir
if (!ß.CFG) ß.CFG = ß.CWD + "/config";

if (!ß.fs.existsSync(ß.CFG)) {
    ß.fs.mkdirpSync(ß.CFG);
    ß.fs.chownSync(ß.CFG, ß.UID, ß.GID);
}

// this object can have globally available values attached
if (!ß.SETTINGS) ß.SETTINGS = {};
