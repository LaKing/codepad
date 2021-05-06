/*

const compiler = require('vue-template-compiler');

Object.keys(ß.VUE_FILES).forEach(function (filename) {

  	if (filename.split('.').pop() !== 'vue') return;
  	const path = ß.CWD + ß.VUE_FILES[filename] + filename;
  
    Ł(path);
  	
  
  	const content = ß.fs.readFileSync(path, "UTF8");
    const parsed = compiler.parseComponent(content);
  	if (!parsed.script) return;

  
	// TODO extract documentation content
  	
});

//*/