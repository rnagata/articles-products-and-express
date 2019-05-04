'use strict';

const express = require('express');
const knex = require('../database');
//const productsModule = require('../db/products.js');
const router = express.Router();

let htmlContent = {};
//let error = { message : undefined };

router.route('/')
  .post((req, res) => {
    knex.insert([
      {name : req.body.name}, 
      {price : parseInt(req.body.price)}, 
      {inventory: parseInt(req.body.inventory)}
    ]).into('products');
    
    // .then((result) => {
    //   res.redirect('/products');
    // })
    // .catch((err) => {
    //   res.redirect('/products/new');
    // })
    // let result = productsModule.createProduct(req.body);
    // if (result.success){
    //   res.redirect('/products/');
    // } else {
    //   error.message = result.message;
    //   res.redirect('/products/new');
    // }
  })
  .get((req, res) => {
    knex.select().table('products')
    .then((result) => {
      console.log('table select result', result);
      res.render('templates/products/index', { products: result });
    })
  });

router.route('/new')
  .get((req, res) => {
    // rename 'tempError' when understanding improves.
    //let tempError = { message : error.message };
    res.render('templates/products/new'); //{});
  });

router.route('/:id/edit')
  .get((req, res) => {
    // rename new obj when understanding improves.
    // let info = { 
    //   message : error.message, 
    //   product : productsModule.getProduct(req.params.id),
    // };
    // error.message = undefined;
    // res.render('templates/products/edit', info);
    knex.select().table('products').where({id: req.params.id})
    .then((result) => {
      res.render('templates/products/edit', { product: result[0] });
    })
  });

router.route('/:id')
//   .put((req, res) => {
//     let result = productsModule.editProduct(req.body, req.params.id);
//     if (result.success){
//       res.redirect(`/products/${req.params.id}`);
//     } else {
//       error.message = result.message;
//       res.redirect(`/products/${req.params.id}/edit`);
//     }
//   })
//   .delete((req, res) => {
//     let result = productsModule.deleteProduct(req.params.id);
//     if (result.success){
//       res.redirect('/products/');
//     } else {
//       error.message = result.message;
//       res.redirect(`/products/${req.params.id}`);
//     }
//   })
  .get((req, res) => {
    knex.select().table('products').where({id: req.params.id})
    .then((result) => {
      res.render('templates/products/product', { product: result[0] });
    });
    //error.message = undefined;
    //productsModule.getProduct(req.params.id));
  });
  
module.exports = router;