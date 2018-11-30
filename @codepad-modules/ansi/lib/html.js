/*jshint esnext: true */

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


function convert_line(line) {
  if (line.length<40) return line; 
  let link = line.substring(line.indexOf(']8;;') + 4,line.length -20);
  return '····· <a style="background-color:rgba(0, 0, 255, 0.4); color:rgba(200, 200, 255, 1);" href="' + link + '">[link]</a>';
}

function filter_codepad_links(input) {
	let lines = input.split('\n');
	for (let l in lines) {
     	if (lines[l].substring(0,5) === '·····') lines[l] = convert_line(lines[l]);
    }
  	return lines.join('\n');
}	


//---------

var AU = require('ansi_up');
var ansi_up = new AU.default();

module.exports = function(input) {
    //return ansi_up.ansi_to_html(input);
  	return filter_codepad_links(ansi_up.ansi_to_html(input));
};