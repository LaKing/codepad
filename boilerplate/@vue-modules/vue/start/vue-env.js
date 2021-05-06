if (process.argv.indexOf("--restart-server") >= 0) return;

/*ßoilerplate */

// @DOC The most important variables are also exported vie the vue-cli env file
const opt = {
    spaces: 4
};

const env_sh_file = ß.VAR + '/vue/.env';
const env_json_file = ß.VAR + '/vue/env.json';

var env_sh = '';
var env_json = {};

function set(key, value) {
	env_sh += key + '=' + value + '\n';
  	env_json[key]=value;
}

set('VUE_APP_HOSTNAME', ß.HOSTNAME);
set('VUE_APP_BASE_URL', 'https://' + ß.HOSTNAME);
set('VUE_APP_DEBUG', ß.DEBUG);
set('VUE_APP_MODE', ß.MODE);
set('VUE_APP_NAME', ß.NAME);

ß.fs.writeFileSync(env_sh_file, env_sh);
ß.fs.writeJsonSync(env_json_file, env_json, opt);

ß.link(env_sh_file, ß.VAR + '/vue/src/.env');
