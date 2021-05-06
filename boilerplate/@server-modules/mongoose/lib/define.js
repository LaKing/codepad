/*ßoilerplate */
/* @DOC
	Mongodb is integrated with the mongoose module. In the init folder:
    `ß.lib.mongoose.define('name'); // name is a collection name we define`
    To keep the conventions we use the default common naming casings.
    `ß[nameModel]` The model
    `name_model + '/keys'` Scripts folder in modules to add keys to the model: 
    `ß[nameSchema]` The Schema
    `name_model + '/methods'` Scripts folder in modules to add methods the the model 
    `ß[Name]` The mongoose model using name and nameSchema.
    `ß.mongoose_collections` The array of collections we use
    `ß.USE_DB_NAME` Constant for reference of used databases.

*/

const mongoose = require('mongoose');
ß.mongoose = mongoose;

mongoose.Promise = global.Promise;

module.exports = function(collection) {
    name = collection.toLowerCase();
    var nameModel = name + 'Model';
    var nameSchema = name + 'Schema';
    var name_model = name + '_model';
    var Name = name.charAt(0).toUpperCase() + name.slice(1);
    var NAME = name.toUpperCase();

    ß[nameModel] = {};

    ß.load(name_model + '/keys');

    ß[nameSchema] = mongoose.Schema(ß[nameModel]);

    ß.load(name_model + '/methods');

    ß[Name] = mongoose.model(name, ß[nameSchema], name);

    ß.mongoose_collections.push(name);
    
    ß['USE_DB_' + NAME] = true;
};