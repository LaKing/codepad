// @DOC We guess the language the user prefers by the request accepted languages list.

// We assume that in ß.PAGES if the key and the lang under the key are identical, then it's the language entrypoint itself
var language_list = [];
if (ß.PAGES)
Object.keys(ß.PAGES).forEach(function(page) {
  if (ß.PAGES[page].lang === page) language_list.push(page);
});

// guess what language to use
module.exports = function(req) {
 
    // compare accepted languages with the language list
    var la = req.acceptsLanguages();
  
    for (var i = 0; i < la.length; i++) {
        for (var j = 0; j < language_list.length; j++) {
            if (la[i] === language_list[j])  return la[i];
        }
    }
    // no match, we stay at the default.
    return ß.DEFAULT_LANG;
};