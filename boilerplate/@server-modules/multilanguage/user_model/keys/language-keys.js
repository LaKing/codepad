// @DOC The `user.lang` is stored in the user database.

var default_lang = 'en';

if (ß.DEFAULT_LANG) default_lang = ß.DEFAULT_LANG;

ß.userModel.lang = {
    type: String,
    default: default_lang
};