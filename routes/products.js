'use strict';

const express = require('express');
const knex = require('../database');
const router = express.Router();

let errorHolder;

router.route('/')
  .post((req, res) => {
    for (let prop in req.body){
      if (req.body[prop] === ''){
        errorHolder = "Missing field";
        return res.redirect('/products/new');
      }
    }
    
    if (isNaN(parseFloat(req.body.price)) || parseFloat(req.body.price) <= 0){
      errorHolder = "Product price must be greater than zero.";
      return res.redirect('/products/new');
    }

    if (isNaN(parseInt(req.body.inventory)) || parseFloat(req.body.inventory) <= 0){
      errorHolder = "Product inventory must be greater than zero.";
      return res.redirect('/products/new');
    }

    knex.select('name').table('products').where({name: req.body.name})
    .then((result) => {
      if (result.length > 0){
        errorHolder = "Product already exists";
        return res.redirect('/products/new');
      }

      return knex.insert({
        name : req.body.name, 
        price : parseInt(req.body.price), 
        inventory: parseInt(req.body.inventory)
      })
      .into('products')
      .then((result) => {
        return res.redirect('/products');
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
    });
  })
    
  .get((req, res) => {
    knex.select().table('products')
    .then((result) => {
      let context = {
        products: result,
      };
      res.render('templates/products/index', context);
    })
  });

router.route('/new')
  .get((req, res) => {
    let context = { error : errorHolder };
    errorHolder = undefined;
    res.render('templates/products/new', context);
  });

router.route('/:id/edit')
  .get((req, res) => {
    knex.select().table('products').where({id: req.params.id})
    .then((result) => {
      res.render('templates/products/edit', { product: result[0] });
    })
  });

router.route('/:id')
  .put((req, res) => {
    let changes = {};

    if (req.body.name.length >= 1){
      changes.name = req.body.name;
    }
    if (!isNaN(parseFloat(req.body.price)) && parseFloat(req.body.price) > 0){
      changes.price = parseInt(req.body.price);
    }
    if (!isNaN(parseInt(req.body.inventory)) && parseInt(req.body.inventory) > 0){
      changes.inventory = parseInt(req.body.inventory);
    }

    if (Object.keys(changes).length > 0){
      knex('products').where('id', '=', req.params.id).update(changes)
      .then((result) => {
        return res.redirect(`/products/${req.params.id}`);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
    } else {
      res.redirect(`/products/${req.params.id}/edit`);
    }
  })

  .delete((req, res) => {
    knex('products').where('id', '=', req.params.id).del()
    .then((result) => {
      if (result >= 1){
        return res.redirect('/products');
      } else {
        return res.redirect(`/products/${req.params.id}`);
      }
    });
  })
  
  .get((req, res) => {
    knex.select().table('products').where({id: req.params.id})
    .then((result) => {
      res.render('templates/products/product', { product: result[0] });
    });
  });
  
module.exports = router;