/* @DOC
	
The language module can be used to create multilingual page versions, with inline translations.
This has been implemented for simple bilingual apps, where english and other languages shall be supported.
The locale specific versions are then rendered for each language in the build process.
 
The `ß.DEFAULT_LANG` variable defines what language should be used, in a fallback to a default.

*/

// in production, we should fallback to an english default.
if (!ß.DEFAULT_LANG)
    if (ß.MODE === "production") ß.DEFAULT_LANG = "en";
    else ß.DEFAULT_LANG = "hu";

ß.debug(" - DEFAULT_LANG", ß.DEFAULT_LANG);