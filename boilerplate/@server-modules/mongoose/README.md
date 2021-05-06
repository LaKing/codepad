## The @mongoose module
#### /@server-modules/mongoose
If there is no config file for mongodb, the first startup will create one automatically.  
Seperate debug config - if exists - will be used in debug mode.  
The default host is 127.0.0.1


[`config_mongodb.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/mongoose/lib/config_mongodb.js?line=3)

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


[`define.js:2`](https://bp-devel.d250.hu:9001/p/@server-modules/mongoose/lib/define.js?line=2)

At startup, a backup script is generated.


[`db.js:3`](https://bp-devel.d250.hu:9001/p/@server-modules/mongoose/start/db.js?line=3)

<pre>
global
 - mongoose.js
init
 - mongoose.js
lib
 - config_mongodb.js
 - define.js
mongo-scripts
 - dropall.js
 - showall.js
start
 - db.js
</pre>

