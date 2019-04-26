'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const products = require('./routes/products.js');
const articles = require('./routes/articles.js');
const htmlContent = {
    body : 'You addressed the server'
}

const app = express();

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/products', products);
app.use('/articles', articles);

app.get('/', function (req, res) {
    res.render('templates/main', htmlContent);
});

app.listen(3000);