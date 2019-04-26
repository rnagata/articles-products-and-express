'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router = express.Router();
const productsModule = require('../db/products.js');
let htmlContent = { 
  body: 'You addressed the products',
};
let error = {
  body: 'Item already exists. Try Again'
}

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride('_method'));

router.route('/')
  .post((req, res) => {
    console.log('Posting on products/');
    if (productsModule.post(req.body).success){
      htmlContent.products = productsModule.get();
      res.render('templates/index', htmlContent);
    } else {
      res.render('templates/new', error);
    }
  })
  .get((req, res) => {
    console.log('Getting on products/');
    htmlContent.products = productsModule.get();
    res.render('templates/index', htmlContent);
  });

router.route('/new*')
  .get((req, res) => {
    console.log('Getting on products/new');
    res.render('templates/new');
  })

router.route('/:id/edit')
  .get((req, res) => {
    console.log(`Getting on products/${req.params.id}/edit`);
    res.render('templates/edit', productsModule.get(req.params.id));
  })

router.route('/:id')
  .put((req, res) => {
    console.log(`Putting on product/${req.params.id}`);
    if (productsModule.put(req.body, req.params.id).success){
      res.render('templates/product', productsModule.get(req.params.id));
    } else {
      res.render('templates/edit');
    }
  })
  .delete((req, res) => {
    console.log(`Deleting on product/${req.params.id}`);
    if (productsModule._delete(req.params.id).success){
      htmlContent.products = productsModule.get();
      res.render('templates/index', htmlContent);
    } else {
      res.render('templates/product', productsModule.get(req.params.id));
    }
  })
  .get((req, res) => {
    console.log(`Getting on product/${req.params.id}`);
    res.render('templates/product', productsModule.get(req.params.id));
  });
  
module.exports = router;