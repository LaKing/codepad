if (process.argv.indexOf("--restart-server") >= 0) return;

var es6_leadnull_file = ß.VAR + "/leadnull.js";
var es6_leadnull = "";

es6_leadnull += "// the leadnull function from boilerplate\n";

if (ß.MODE !== "production") {
    es6_leadnull += "function link_code(arg) {\n";
    es6_leadnull += "   var e = arg.split('./src').pop().split('?')[0];\n";
    es6_leadnull += "   if (e) return '@' + e; \n";
    es6_leadnull += "   return arg; \n";
    es6_leadnull += "}\n\n";
}

es6_leadnull += "export default function ł(obj, key){ \n";

if (ß.MODE !== "production") {
es6_leadnull += "    if (typeof obj !== 'object') {\n";
es6_leadnull += "        var stack1 = new Error().stack;\n";
es6_leadnull += "        var from1 = link_code(stack1.split('\\n')[2]);\n";
es6_leadnull += "        console.log('Wrong use of ł, first argument is not an object', from1);\n";
es6_leadnull += "        return null;\n";
es6_leadnull += "    }\n";
es6_leadnull += "    if (typeof key !== 'string') {\n";
es6_leadnull += "        var stack2 = new Error().stack;\n";
es6_leadnull += "        var from2 = link_code(stack2.split('\\n')[2]);\n";
es6_leadnull += "        console.log('Wrong use of ł, second argument is not a string in', from2);\n";
es6_leadnull += "        return null;\n";
es6_leadnull += "    }\n";
}

es6_leadnull += "       return key.split('.').reduce(function(o, x) {\n";
es6_leadnull += "           return typeof o == 'undefined' || o === null ? o : o[x];\n";
es6_leadnull += "       }, obj);\n";
es6_leadnull += "};\n\n";

ß.fs.writeFileSync(es6_leadnull_file, es6_leadnull);
ß.fs.chownSync(es6_leadnull_file, ß.UID, ß.GID);
