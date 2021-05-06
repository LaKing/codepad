ß.mongo_express = require('mongo-express/lib/middleware');
ß.mongo_express_config = require('./mongo_express_config');

ß.app.use('/mongo_express', ß.lib.passport_admin.isLoggedInAdmin, ß.mongo_express(ß.mongo_express_config));