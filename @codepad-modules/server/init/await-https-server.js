// we want to tell our IDE that we are waiting for this process
ß.fs.mkdirpSync(ß.VAR + '/await');
const await_file = ß.VAR + "/await/await-https-server.pid";
ß.fs.writeFileSync(await_file, process.pid);