/*ßoilerplate */

const mongo_config = ß.lib.mongoose.config_mongodb();

// WARNING: The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it.
//ß.mongoose.connect(mongo_config.url, {
//    useMongoClient: true,
//});

// node:20003) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
//ß.mongoose.connect(mongo_config.url, {});

ß.mongoose.connect(mongo_config.url,{ useNewUrlParser: true, useUnifiedTopology: true });