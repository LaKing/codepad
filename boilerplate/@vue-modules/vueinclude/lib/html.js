// including html files is not as simple as it could be, but we do our best

// option 1.
// const stripHtml = require("string-strip-html"); /// seems to be breaking
// option 2.
const striptags = require("striptags");
// option 3.
const HTMLParser = require("node-html-parser");

/*	@DOC
clouddir html files are prepared for vue, by parsing the html and by stripping tags and putting them into a preformatted-html template.

`ß.vueinclude_html_parser_options` - use options from [node-html-parser](https://www.npmjs.com/package/node-html-parser)
`ß.vueinclude_striptags_allowed_tags` and `ß.vueinclude_striptags_tag_replacement` - use options from [striptags](https://www.npmjs.com/package/striptags)

*/

module.exports = function (base_path, file_path) {
    // @DOC

    var content = ß.fs.readFileSync(base_path + file_path, "UTF8");
    var src_data = "";
    var div_class = "vue-include";
    //var vue_content = stripHtml(content, { ignoreTags: ["p", "span"] })
    //var vue_content = striptags(content,  ["p", "span"], '\n') ;
    let parsed = HTMLParser.parse(content, ß.vueinclude_html_parser_options);
    var innerHTML = "";

    if (parsed.querySelector("body")) innerHTML = parsed.querySelector("body").innerHTML;
    else ß.err("No innerHTML on " + file_path);

    // we may consider a special case, where a html file is uploaded with extension and then converted
    if (file_path.indexOf(".html.html") >= 0) {
        src_data = innerHTML;
        div_class += " preformatted-html";
    } else {
        // this is a html where we will apply striptags
        src_data = striptags(innerHTML, ß.vueinclude_striptags_allowed_tags, ß.vueinclude_striptags_tag_replacement);
    }
    var dst_data = src_data;
    var dir = ß.path.dirname(ß.VAR + "/vue-include/" + file_path);
    ß.fs.ensureDirSync(dir);

    //if (ß.fs.exsistSync(ß.VAR + "/vue-include/" + file_path + ".vue")) return ß.err("[vue-include html]Wont overwrite " + file_path + ".vue");
    ß.fs.writeFileSync(ß.VAR + "/vue-include/" + file_path + ".vue", '<template><div class="' + div_class + '">' + dst_data + "</div></template>");
};
