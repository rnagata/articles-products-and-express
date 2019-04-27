'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const articlesModule = require('../db/articles.js');

let htmlContent = {};
let error = { message : undefined };
const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride('_method'));

router.route('/')
  .post((req, res) => {
    let result = articlesModule.post(req.body);
    if (result.success){
      res.redirect('/articles/');
    } else {
      res.redirect('/articles/new');
    }
  })
  .get((req, res) => {
    htmlContent.articles = articlesModule.getArticles();
    res.render('templates/articles/index', htmlContent);
  });

router.route('/new*')
  .get((req, res) => {
    res.render('templates/articles/new');
  })

router.route('/:title/edit')
  .get((req, res) => {
    res.render('templates/articles/edit', articlesModule.getArticle(req.params.title));
  })

router.route('/:title')
  .put((req, res) => {
    let result = articlesModule.put(req.body, req.params.title);
    if (result.success){
      res.redirect(`/articles/${req.params.title}`);
    } else {
      res.redirect(`/articles/${req.params.title}/edit`);
    }
  })
  .delete((req, res) => {
    let result = articlesModule._delete(req.params.title);
    if (result.success){
      res.redirect('/articles/');
    } else {
      res.redirect(`/articles/${req.params.title}`);
    }
  })
  .get((req, res) => {
    res.render('templates/article', articlesModule.getArticle(req.params.title));
  });
  
module.exports = router;