/*ßoilerplate */
const fs = ß.fs;

function string_to_schema(str) {

    var s = str.toLowerCase();

    if (s === 'string') return String;
    if (s === 'boolean') return Boolean;
    if (s === 'number') return Number;
    if (s === 'date') return Date;
    if (s === 'buffer') return Buffer;
    if (s === 'object') return Object;
    if (s === 'array') return [];

    return String;
}

module.exports = function(file) {

    var data = fs.readJsonSync(file, "UTF-8");
    var schema = {};

    Object.keys(data).forEach(function(key) {

        schema[key] = {};
        if (data[key].definitions)
            data[key].definitions.forEach(function(o) {
                if (o.mongo)
                    schema[key][o.field] = string_to_schema(o.mongo);
            });
    });
    return schema;
};