const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
 
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
   confpassword: {
    type: String,
    required: true
  },
  token: String,
  firstname: String,
  lastname: String,
  email: String,
  telephone: String
});

Users.plugin(passportLocalMongoose);

// Création du schéma pour Mongoose

module.exports = mongoose.model('users', Users);


