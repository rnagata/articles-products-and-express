'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const products = require('./routes/products.js');
const htmlContent = {
    body : 'You addressed the server'
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/products', products);
app.get('/', function (req, res) {
    res.render('main', htmlContent);
});

app.listen(3000);