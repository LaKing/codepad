
if (process.argv.indexOf("--restart-server") >= 0) return;


// we will overwrite this file once the fork has spawned.
ß.fs.mkdirpSync(ß.VAR + '/await');
const await_file = ß.VAR + "/await/fork-vue-build.pid";
ß.fs.writeFileSync(await_file, process.pid.toString());