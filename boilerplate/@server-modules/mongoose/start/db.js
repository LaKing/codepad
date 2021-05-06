/*ßoilerplate */

// @DOC At startup, a backup script is generated.

var collections = ß.mongoose_collections;
var url = ß.lib.mongoose.config_mongodb().url;

console.log(' - mongoose ' + url + ' collections:', collections.join(' '));

var import_str = '#!/bin/bash \n';
var export_str = '#!/bin/bash \n';

for (var c in collections) {
    import_str += 'mongoimport --jsonArray --uri ' + url + ' --collection ' + collections[c] + ' exports_' + collections[c] + '.json \n';
    export_str += 'mongoexport --jsonArray --uri ' + url + ' --collection ' + collections[c] + ' --out exports_' + collections[c] + '.json \n';
}

ß.fs.writeFile('export_mongodb.sh', export_str, function(err) {
    Đ(err);
});

ß.fs.writeFile('import_mongodb.sh', import_str, function(err) {
    Đ(err);
});
