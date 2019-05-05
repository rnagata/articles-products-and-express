'use strict';

const path = require('path')
const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const knex = require('./database');
const products = require('./routes/products.js');
const articles = require('./routes/articles.js');
const app = express();

const htmlContent = {
  body : 'You addressed the server'
}

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({ 
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', products);
app.use('/articles', articles);
app.get('/', function (req, res) {
  res.render('templates/main', htmlContent);
});

app.listen(3000);