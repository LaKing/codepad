if (process.argv.indexOf("--restart-server") >= 0) return;

const fs = ß.fs;
const path = require('path');

// write an optional set of bash files for directly operating on the frontend

var br = "\n";
let sh = "#!/bin/bash";
sh += br + 'date +"%T"';
sh += br + "su codepad -s /bin/bash -c 'node " + ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js --mode development build'";
sh += br + 'date +"%T"';
fs.writeFileSync(ß.VAR + '/vue/vue-development-build.sh', sh);

sh = "#!/bin/bash";
sh += br + 'date +"%T"';
sh += br + "su codepad -s /bin/bash -c 'node " + ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js build'";
sh += br + 'date +"%T"';
fs.writeFileSync(ß.VAR + '/vue/vue-production-build.sh', sh);

sh = "#!/bin/bash";
sh += br + 'date +"%T"';
sh += br + "su codepad -s /bin/bash -c 'node " + ß.VAR + "/vue/node_modules/@vue/cli-service/bin/vue-cli-service.js --mode development serve'";
sh += br + 'date +"%T"';
fs.writeFileSync(ß.VAR + '/vue/vue-serve.sh', sh);


