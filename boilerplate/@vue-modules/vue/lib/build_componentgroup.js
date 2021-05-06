module.exports = function (group) {
    var imp = "// this is an automatically generated file from the ßoilerplate framework\n";
    var exp = "";

    var check = {};

    const space = /\s/g;
    const minus = /-/gi;

    const replaceWith = "_";
  	var log = "";

    Object.keys(ß.VUE_FILES).forEach(function (filename, ix) {
        if (filename.split(".").pop() !== "js") return;
        if (filename.split("/").pop().split(".")[1] !== group) return;
        if (filename.split("/").pop().split(".")[1] === "min") return;
        const name = filename.split("/").pop().split(".")[0].replace(space, replaceWith).replace(minus, replaceWith);

        if (check[name]) {
            ß.err("Vue componentgroup file naming collision: " + name + "already exists, cannot add " + filename);
            imp += "\n// " + ß.VUE_FILES[filename] + ";\n";
            imp += "// import " + name + " from '@" + filename + "';\n";
            imp += "// .. conflicts with @" + check[name] + "';\n";
          	log += "// .. conflicts with @" + check[name] + " on " + name + " as '@" + filename + " from "+ ß.VUE_FILES[filename] +"';\n";

        } else {
            imp += "\n// " + ß.VUE_FILES[filename] + ";\n";
            imp += "import " + name + " from '@" + filename + "';\n";
          	log += name + " as '@" + filename + " from "+ ß.VUE_FILES[filename] +"';\n";
            exp += name + ": " + name + ", ";
            check[name] = filename;
        }
    });
	
  	ß.fs.ensureDirSync(ß.VAR + "/vue/src/componentgroup");
    ß.fs.writeFileSync(ß.VAR + "/vue/src/componentgroup/" + group + ".js", imp + "\n\nexport default {" + exp + "};");
    ß.fs.writeFileSync(ß.BPLOG + "/componentgroup-" + group + ".log", log);
  	ß.debug(" -- Built VUE componentgroup @/componentgroup/" + group + ".js");
};
