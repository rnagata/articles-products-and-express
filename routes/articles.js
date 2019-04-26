'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const router = express.Router();
const articleModule = require('../db/articles.js');
let htmlContent = { 
  articlesObj : true,
  body: 'You addressed the articles',
};
const newArticleHTML = {
  _type: 'Article',
  formAction : '/articles/',
  nameTitleLabel : 'Title',
  priceAuthorLabel: 'Author',
  inventoryBodyLabel : 'Body',
  submitButtonText: 'Article'
}

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride('_method'));

router.route('/')
  .post((req, res) => {
    console.log('Posting on articles/');
    if (articleModule.post(req.body).success){
      htmlContent.articles = articleModule.get();
      res.render('templates/index', htmlContent);
    } else {
      res.render('templates/new', error);
    }
  })
  .get((req, res) => {
    console.log('Getting on articles/');
    htmlContent.articles = articleModule.get();
    res.render('templates/index', htmlContent);
  });

router.route('/new*')
  .get((req, res) => {
    console.log('Getting on articles/new');
    res.render('templates/new', newArticleHTML);
  })

router.route('/*/edit')
  .get((req, res) => {
    let articleURI = req.path.slice(1, req.path.indexOf('/edit'));
    console.log(`Getting on articles/${articleURI}/edit`);
    res.render('templates/edit', articleModule.get(articleURI));
  })

router.route('/*')
  .put((req, res) => {
    let articleURI = req.path.slice(1);
    console.log(`Putting on product/${articleURI}`);
    if (articleModule.put(req.body, articleURI).success){
      res.render('templates/product', articleModule.get(articleURI));
    } else {
      res.render('templates/edit');
    }
  })
  .delete((req, res) => {
    console.log('Deleting on product/id');
    req.body.id = req.path.slice(1);
    console.log('Edited: ', req.body);
    let temp = articleModule._delete(req.body);
    if (temp.success){
      htmlContent.articles = articleModule.get();
      console.log(articleModule.get());
      res.render('templates/index', htmlContent);
    } else {
      res.render('templates/product', articleModule.get()[temp.id]);
    }
    articleModule._delete(req.body);
  })
  .get((req, res) => {
    let articleURI = req.path.slice(1);
    console.log('Getting on product/id');
    console.log(`Getting product ${articleURI} from DB`);
    res.render('templates/product', articleModule.get(articleURI));
  });
  
module.exports = router;