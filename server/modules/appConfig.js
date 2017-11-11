var path = require('path');

/*
module.exports = function Connection() {    
  this.handle = eventhandle;
  this.connect = function() {
      handle.notify("completed connection....");
  }
} 
*/
var appConf = require('../config/appConfig.json');

module.exports = function appConfiguration(config) {
  var module = {};

  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      console.log(key + " -> " + config[key]);
      appConf[key] = config[key];
    }
  }


  module.setOption = function (name, value) {
    console.log('setOptions name ' + name + ' value ' + value);
    appConf[name] = value;
  };

  
  module.getOption = function (name) {
    console.log('getOptions name ' + name );
    return appConf[name] ;
  };

  module.listOptions = function () {
    for (var key in appConf) {
      if (appConf.hasOwnProperty(key)) {
        console.log(key + " -> " + appConf[key]);
      }
    }
  };

  

  return module;
}

