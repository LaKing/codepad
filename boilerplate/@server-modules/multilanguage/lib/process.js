/* @DOC
	A string or document might be processed by the language module.  
    The process will then discard irrelevant language chunks, and select the selected ones for the specific language.  
    
    The following string will be rendered as 'Hello world' in english and hungarian languages.
    `##&en Hello World! ##&hu Hello Világ! ##`   
    
*/

// these are the seperators
const CHUNK_SEPERATOR = '##';
const LANGUAGE_PREFIX = '&';

//
// Keep in mind that this file might be used in webpack modules indirectly, outside of the boilerplate loader
// The original sourcefile is under @server-modules/multilanguage/lib/process.js
//

// A sort of search and replace

/*
 *  lang: string like 'en' or 'hu'
 *  data: string
 *
 *  returns the translated data as string
 */

function process_data(lang, data) {
	
  	// validate input
  	//if (!lang) {
    //  console.error("Could not properly process multilingual data due to missing lang");
    //  return data;
    //}
  
  	//if (!data) return console.error("Could not process missing multilingual data");
  	
    // create chunks array
    var ca = data.split(CHUNK_SEPERATOR);
    // resulting string will be here
    var r = '';
    // iterate through the chunks
    for (var i = 0; i < ca.length; i++) {
        // if this chunk starts with a LANGUAGE_PREFIX, it is considered to be a language specific chunk
        if (ca[i].charAt(0) === LANGUAGE_PREFIX) {
            // check if need to keep it, other
            if (ca[i].substring(0, LANGUAGE_PREFIX.length + lang.length + 1) === LANGUAGE_PREFIX + lang + ' ') r += ca[i].substring(LANGUAGE_PREFIX.length + lang.length + 1, ca[i].length - 1);
        } else {
            // if it is not a language specific chunk, we have to keep it
            r += ca[i];
        }
    }
    return r;
}

module.exports = process_data;