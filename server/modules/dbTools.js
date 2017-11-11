//Import the mongoose module
var mongoose = require('mongoose');
var logger = require('./logger').logger;

//Set up default mongoose connection



module.exports = function createDbConn(cfg) {

//Get the default connection
if ( cfg) {
var mongoDB = cfg.getOption('mongoDbUrl') || 'mongodb://127.0.0.1/webapi2';
}
else 
  {
    var mongoDB = 'mongodb://127.0.0.1/default';
  }
mongoose.connect(mongoDB, {
  useMongoClient: true
});


var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', function (err) {
  cfg.setOption('connectedToMongo', 'false');
console.error.bind(console, 'MongoDB connection error:'); 
logger.log('error', "MongoDB connection error:"+ err);
});

db.on('connected', function () {  
  console.log('Mongoose default connection open to ' + mongoDB);
  cfg.setOption('connectedToMongo', 'true');
}); 
return db
};