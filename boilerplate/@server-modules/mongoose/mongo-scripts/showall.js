/*ßoilerplate */

var dbs = db.getMongo().getDBNames();
for (var i in dbs) {
    var db = db.getMongo().getDB(dbs[i]);
    print("// Database " + db.getName());
    var collections = db.getCollectionNames();
    for (var i = 0; i < collections.length; i++) {
        print('// Collection: ' + collections[i]); // print the name of each collection
        db.getCollection(collections[i]).find().forEach(printjson); //and then print the json of each of its elements}
    }
}