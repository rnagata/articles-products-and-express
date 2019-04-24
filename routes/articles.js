'use strict';

const express = require('express');
const router = express.Router();



const test_2 = { body: 'Sayonara'};

router.route('/')
  .get((req, res) => {
    res.send('About Me');
  })
  .post((req, res) => {
    res.send('Added something in about me');
  })
  .put((req, res) => {
    res.send('Update about me');
  })

module.exports = router;