/*ßoilerplate */

/*

// Link with ansi tags
// echo -e '\e]8;;http://example.com\e\\This is a link\e]8;;\e\\'

// link with ansi tags made with nodejs
// test case

const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';

const TAG = OSC + '8' + SEP + SEP;

// <a href="url">link text</a>
var test = TAG +  "https://example.com" + BEL + "example.com" + TAG + BEL;
console.log(test);
*/


//---------

var AU = require('ansi_up');
var ansi_up = new AU.default();

module.exports = function(input) {
    return ansi_up.ansi_to_html(input);
  	//return filter_codepad_links(ansi_up.ansi_to_html(input));
};