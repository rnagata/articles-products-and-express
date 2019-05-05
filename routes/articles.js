'use strict';

const express = require('express');
const knex = require('../database');
//const articlesModule = require('../db/articles.js');
const router = express.Router();

// let htmlContent = {};
// let error = { message : undefined };

router.route('/')
  // .post((req, res) => {
  //   let result = articlesModule.createArticle(req.body);
  //   if (result.success){
  //     res.redirect('/articles/');
  //   } else {
  //     res.redirect('/articles/new');
  //   }
  // })
  .get((req, res) => {
    knex.select().table('articles')
    .then((result) => {
      console.log('article select result', result);
      res.render('templates/articles/index', { articles: result });
    })
    // res.send('OK');

    // htmlContent.articles = articlesModule.getArticles();
    // res.render('templates/articles/index', htmlContent);
  });

// router.route('/new')
//   .get((req, res) => {
//     res.render('templates/articles/new');
//   })

// router.route('/:title/edit')
//   .get((req, res) => {
//     res.render('templates/articles/edit', articlesModule.getArticle(req.params.title));
//   })

// router.route('/:title')
//   .put((req, res) => {
//     let result = articlesModule.editArticle(req.body, req.params.title);
//     if (result.success){
//       res.redirect(`/articles/${req.params.title}`);
//     } else {
//       res.redirect(`/articles/${req.params.title}/edit`);
//     }
//   })
//   .delete((req, res) => {
//     let result = articlesModule.deleteArticle(req.params.title);
//     if (result.success){
//       res.redirect('/articles/');
//     } else {
//       res.redirect(`/articles/${req.params.title}`);
//     }
//   })
//   .get((req, res) => {
//     res.render('templates/article', articlesModule.getArticle(req.params.title));
//   });
  
module.exports = router;