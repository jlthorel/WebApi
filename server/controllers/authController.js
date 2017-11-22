'use strict';
var Contact = require('../models/userModel.js');

exports.checkLoginUser = function (req, res, next) {
  console.log('########## checkLoginUser: ' + req.body.username);
  console.log(req.body);
  Contact.find({ username: req.body.username })
    .then(function (doc) {
      console.log(doc);
      res.header('Access-Control-Allow-Origin', '*');
      // res.json({ 'data' : 'validation ok'});  // todo to remove
      if (doc == '') {
        console.log('User Does not existe snd error msg');
        res.statusCode = 401;
        var responseData = {
          statusText: 'User or password invalid',
          Connected: false
        };
        res.json(responseData);
      } else {
        // user exist check password
        console.log('pass :' + req.body.password + ' doc ' + doc.password);
        if (req.password == doc.password) {
          // aut
          res.statusCode = 200;
          responseData = {
            statusText: 'User and  password valid',
            Connected: true,
            token: 'totototototot'

          };
          res.json(responseData);
        } else {
          res.statusCode = 401;
          console.log('pass :' + req.body.password + ' doc ' + doc.password);
          res.json({ 'message': 'User or password invalid' });
        }
      }
      // res.json('then ' + doc);
    })
    .catch(next);
};

exports.listAllUser = function (req, res) {
  res.charset = 'utf-8';
  var users = {};
  Contact.find({})
    .then(function (user) {
      console.log('user : ');
      console.log(user);

      res.header('Access-Control-Allow-Origin', '*');
      res.statusCode = 201;

      res.send(user);
    });

  console.log('users : ');
  console.log(users);
  console.log('end user : ');

  // res.json([{ login: 'john', status: 'connected' }, { login: 'doe', status: 'connected' }]);
};

exports.createUser = function (req, res, next) {
  console.log(req.body);
  console.log('user : ' + req.body.username + ' password : ' + req.body.password);
  res.header('Access-Control-Allow-Origin', '*');
  res.statusCode = 401;

  const contact = new Contact(req.body);
  contact.save()
    .then(contact => {
      res.header('Access-Control-Allow-Origin', '*');
      res.statusCode = 201;
      res.json(contact);
    })
    .catch(next);
};

exports.readUser = function (req, res) {
  res.end('WebApi : readUser ');
};

exports.updateUser = function (req, res) {
  res.end('WebApi : updateUser ');
};

exports.deleteUser = function (req, res) {
  res.end('WebApi : deleteUser ');
};
