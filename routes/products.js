'use strict';

const express = require('express');
const productsModule = require('../db/products.js');
const router = express.Router();

let htmlContent = {};
let error = { message : undefined };

router.route('/')
  .post((req, res) => {
    let result = productsModule.createProduct(req.body);
    if (result.success){
      res.redirect('/products/');
    } else {
      error.message = result.message;
      res.redirect('/products/new');
    }
  })
  .get((req, res) => {
    htmlContent.products = productsModule.getProducts();
    res.render('templates/products/index', htmlContent);
  });

router.route('/new')
  .get((req, res) => {
    // rename 'tempError' when understanding improves.
    let tempError = { message : error.message };
    error.message = undefined;
    res.render('templates/products/new', tempError);
  });

router.route('/:id/edit')
  .get((req, res) => {
    // rename new obj when understanding improves.
    let info = { 
      message : error.message, 
      product : productsModule.getProduct(req.params.id),
    };
    error.message = undefined;
    res.render('templates/products/edit', info);
  });

router.route('/:id')
  .put((req, res) => {
    let result = productsModule.editProduct(req.body, req.params.id);
    if (result.success){
      res.redirect(`/products/${req.params.id}`);
    } else {
      error.message = result.message;
      res.redirect(`/products/${req.params.id}/edit`);
    }
  })
  .delete((req, res) => {
    let result = productsModule.deleteProduct(req.params.id);
    if (result.success){
      res.redirect('/products/');
    } else {
      error.message = result.message;
      res.redirect(`/products/${req.params.id}`);
    }
  })
  .get((req, res) => {
    error.message = undefined;
    res.render('templates/product', productsModule.getProduct(req.params.id));
  });
  
module.exports = router;