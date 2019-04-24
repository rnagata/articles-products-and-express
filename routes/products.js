'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const productsModule = require('../db/products.js');
let htmlContent = { 
  body: 'You addressed the products',
};

router.use(bodyParser.urlencoded({extended: true}));

router.route('/')
  .post((req, res) => {
    res.send('Added a product');
    productsModule.post(req.body);
  })
  .put((req, res) => {
    res.send('Updated a product');
    productsModule.put(req.body);
  })
  .delete((req, res) => {
    res.send('Removed a product from inventory');
    productsModule._delete(req.body);
  })
  .get((req, res) => {
    htmlContent.products = productsModule.get();
    res.render('index', htmlContent);
  });

router.route(`/*`)
  .put((req, res) => {
    
  })
  .get((req, res) => {
    // console.log(req.path.slice(1));
    // console.log(productsModule.get()[req.path.slice(1)]);
    res.render('product', productsModule.get()[req.path.slice(1)]);
  });
  

module.exports = router;