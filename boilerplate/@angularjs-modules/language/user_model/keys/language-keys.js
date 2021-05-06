
var default_lang = 'en';

if (ß.language) {
	if (ß.language.default) default_lang = ß.language.default;
}

ß.userModel.lang = {
    type: String,
    default: default_lang
};
