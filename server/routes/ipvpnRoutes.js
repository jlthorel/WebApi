'use strict';
var express = require('express');
var productsRouter = express.Router();
var webApi = require('../controllers/productController');

// IPVPN  Routes
productsRouter.route('/Products')
  .get(webApi.listAllProducts)
  .post(webApi.createProducts);

productsRouter.route('/Products/:productname')
  .get(webApi.readProducts)
  .put(webApi.updateProducts)
  .delete(webApi.deleteProducts);

module.exports = productsRouter;
