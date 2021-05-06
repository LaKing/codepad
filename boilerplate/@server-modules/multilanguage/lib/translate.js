// these are the seperators
const CHUNK_SEPERATOR = "##";
const LANGUAGE_PREFIX = "&";

function translate(arg, data) {
    // we do some extended guessing and checking

    if (!arg) return data;
    if (!data) console.log("No data for translation ", new Error().stack);
    var lang = "en";

    // do a best guess on the argument
    if (typeof arg === "string") lang = arg;
    else if (typeof arg === "object") {
        if (arg.lang) lang = arg.lang;
        if (arg.session) if (arg.session.lang) lang = arg.session.lang;
    }

    //return ß.lib.multilanguage.process(lang, data);

    // go directly ... copy of multilanguage.process
    // create chunks array
    var ca = data.split(CHUNK_SEPERATOR);
    // resulting string will be here
    var r = "";
    // iterate through the chunks
    for (var i = 0; i < ca.length; i++) {
        // if this chunk starts with a LANGUAGE_PREFIX, it is considered to be a language specific chunk
        if (ca[i].charAt(0) === LANGUAGE_PREFIX) {
            // check if need to keep it, other
            if (ca[i].substring(0, LANGUAGE_PREFIX.length + lang.length + 1) === LANGUAGE_PREFIX + lang + " ")
                r += ca[i].substring(LANGUAGE_PREFIX.length + lang.length + 1, ca[i].length - 1);
        } else {
            // if it is not a language specific chunk, we have to keep it
            r += ca[i];
        }
    }

    return r;
}

module.exports = translate;

ß.translate = translate;
