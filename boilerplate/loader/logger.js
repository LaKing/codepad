
// @DOC by default the logger object is the console, but we can use other loggers too, eg files.

const Console = require("console").Console;
const logger = new Console(process.stdout, process.stderr);

if (!ß.logger) ß.logger = logger;