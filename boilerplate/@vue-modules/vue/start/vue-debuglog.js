if (process.argv.indexOf("--restart-server") >= 0) return;

// @DOC The `Ł` debug function has been implemented for the vue frontend!

// write a debuglog.js with a default export to use Ł();

let es6_debuglog_link_code = "";
es6_debuglog_link_code += "// extract the file wich may be the caler\n";
es6_debuglog_link_code += "function link_code(arg) {\n";
es6_debuglog_link_code += "   var e = arg.split('./src').pop().split('?')[0];\n";
es6_debuglog_link_code += "   if (e) return e; \n";
es6_debuglog_link_code += "   return arg; \n";
es6_debuglog_link_code += "}\n\n";
es6_debuglog_link_code += "// the debuglog function from boilerplate\n";

let es6_debuglog_Ł = "";
es6_debuglog_Ł += "export default function Ł(){ \n";
es6_debuglog_Ł += "   var stack = new Error().stack;\n";
es6_debuglog_Ł += "   var from = link_code(stack.split('\\n')[2]).split(':')[0];\n";
es6_debuglog_Ł += "   console.log('┏━━━ Ł', new Date().toTimeString().split(' ')[0], '#0 typeof', typeof arguments[0]);\n";
es6_debuglog_Ł += "   for (let arg in arguments) {\n";
es6_debuglog_Ł += "       console.log('┠─  ', arguments[arg]);\n";
es6_debuglog_Ł += "       }\n";
es6_debuglog_Ł += "   console.log('┗━━━━', '@' + from, '"+ ß.EDITOR_LINKBASE +"' + ß.VUE_FILES[from] + from);\n";
es6_debuglog_Ł += "   return arguments;\n";
es6_debuglog_Ł += "};\n\n";

let es6_debuglog_ŁOG = "";
es6_debuglog_ŁOG += "export default function ŁOG(){ \n";
es6_debuglog_ŁOG += "   var stack = new Error().stack;\n";
es6_debuglog_ŁOG += "   var from = link_code(stack.split('\\n')[2]).split(':')[0];\n";
es6_debuglog_ŁOG += "   console.log('┏━━━ ŁOG', new Date().toTimeString().split(' ')[0]);\n";
es6_debuglog_ŁOG += "   for (let arg in arguments) {\n";
es6_debuglog_ŁOG += "       let value = arguments[arg];\n";
es6_debuglog_ŁOG += "       let type = typeof arguments[arg];\n";
es6_debuglog_ŁOG += "       if (value === null) {\n";
es6_debuglog_ŁOG += "       	console.log('┠── #' + arg, ' null');\n";
es6_debuglog_ŁOG += "       	continue;\n";
es6_debuglog_ŁOG += "       }\n";
es6_debuglog_ŁOG += "       if (type === 'undefined') {\n";
es6_debuglog_ŁOG += "       	console.log('┠── #' + arg, ' undefined');\n";
es6_debuglog_ŁOG += "       	continue;\n";
es6_debuglog_ŁOG += "       }\n";
es6_debuglog_ŁOG += "       if (type === 'object') value = JSON.stringify(value);\n";
es6_debuglog_ŁOG += "       else if (value.hasOwnProperty('toString')) value = value.toString();\n";
es6_debuglog_ŁOG += "       type += ' ';\n";
es6_debuglog_ŁOG += "       console.log('┠── #' + arg, type.padEnd(9, '─'), value);\n";
es6_debuglog_ŁOG += "   }\n";
es6_debuglog_ŁOG += "   console.log('┗━━━━', '@' + from, '"+ ß.EDITOR_LINKBASE +"' + ß.VUE_FILES[from] + from);\n";
es6_debuglog_ŁOG += "   return arguments;\n";
es6_debuglog_ŁOG += "};\n\n";

const es6_debuglog_Ł_file = ß.VAR + "/debuglog_Ł.js";
if (ß.MODE === "production") ß.fs.writeFileSync(es6_debuglog_Ł_file, "export default function Ł(){ console.log('DEBUGLOG is disabled in production') };");
else ß.fs.writeFileSync(es6_debuglog_Ł_file, es6_debuglog_link_code + es6_debuglog_Ł);
ß.fs.chownSync(es6_debuglog_Ł_file, ß.UID, ß.GID);

const es6_debuglog_ŁOG_file = ß.VAR + "/debuglog_ŁOG.js";
if (ß.MODE === "production") ß.fs.writeFileSync(es6_debuglog_ŁOG_file, "export default function Ł(){ console.log('DEBUGLOG is disabled in production') };");
else ß.fs.writeFileSync(es6_debuglog_ŁOG_file, es6_debuglog_link_code + es6_debuglog_ŁOG);
ß.fs.chownSync(es6_debuglog_ŁOG_file, ß.UID, ß.GID);