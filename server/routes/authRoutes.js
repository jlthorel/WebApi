'use strict';
var express = require('express');
var authRouter = express.Router();
var webApi = require('../controllers/authController');
var validate = require('express-jsonschema').validate;

var createUserSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: false
    }
  }
};

  // AUTH  Routes
authRouter.route('/login')
  .post(webApi.checkLoginUser);

authRouter.route('/user')
  .get(webApi.listAllUser)
  .post(webApi.createUser);
// .post(validate({body: createUserSchema}), webApi.createUser);

authRouter.route('/user/:username')
  .get(webApi.readUser)
  .put(webApi.updateUser)
  .delete(webApi.deleteUser);

module.exports = authRouter;
