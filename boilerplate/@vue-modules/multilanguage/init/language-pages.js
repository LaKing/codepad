if (process.argv.indexOf("--restart-server") >= 0) return;

// Automatically generate language versions

if (ß.APP_LANGUAGES)
    Object.keys(ß.APP_LANGUAGES).forEach(function(lang) {
      	// if not disabled with a false variable
        if (!ß.APP_LANGUAGES[lang]) return console.log("ß.APP_LANGUAGES dont use " + lang);
        // and not predefined
        if (ß.PAGES[lang]) return;
        ß.PAGES[lang] = {};
      	// take defaults from index
        ß.PAGES[lang].entry = ß.PAGES.index.entry;
        ß.PAGES[lang].template = ß.PAGES.index.template;
        // and use language-specific html and an extra attribute
        ß.PAGES[lang].filename = lang + ".html";
        ß.PAGES[lang].lang = lang;
    });
