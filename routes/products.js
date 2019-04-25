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
      console.log(productsModule.get());
      res.render('templates/index', htmlContent);
    } else {
      res.render('templates/new', error);
    }
  })
  .get((req, res) => {
    console.log('Getting on products/');
    htmlContent.products = productsModule.get();
    console.log(htmlContent.products);
    res.render('templates/index', htmlContent);
  });

router.route('/new*')
  .get((req, res) => {
    console.log('Getting on products/new');
    res.render('templates/new');
  })

router.route('/*/edit')
  .get((req, res) => {
    console.log('Getting on products/*/edit');
    console.log('Path is', req.path);
    console.log('Just the number: ', req.path.slice(1, req.path.indexOf('/edit')));//, req.path.indexOf('/')));
    res.render('templates/edit', { id : req.path.slice(1, req.path.indexOf('/edit'))});
  })

router.route('/*')
  .put((req, res) => {
    console.log('Putting on product/id');
    req.body.id = req.path.slice(1);
    console.log('Edited: ', req.body);
    let temp = productsModule.put(req.body);
    if (temp.success){
      htmlContent.products = productsModule.get();
      console.log(productsModule.get());
      res.render('templates/product', productsModule.get()[temp.id]);
    } else {
      res.render('templates/edit');
    }
  })
  .delete((req, res) => {
    console.log('Deleting on product/id');
    req.body.id = req.path.slice(1);
    console.log('Edited: ', req.body);
    let temp = productsModule._delete(req.body);
    if (temp.success){
      htmlContent.products = productsModule.get();
      console.log(productsModule.get());
      res.render('templates/index', htmlContent);
    } else {
      res.render('templates/product', productsModule.get()[temp.id]);
    }
    productsModule._delete(req.body);
  })
  .get((req, res) => {
    res.render('templates/product', productsModule.get()[req.path.slice(1)]);
  });
  
module.exports = router;