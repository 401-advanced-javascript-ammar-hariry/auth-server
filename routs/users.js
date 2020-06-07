'use strict';

const express = require('express');
const signUp = require('../models/usersmodel');
const router = express.Router();

router.get('/users', signUpUser);

function signUpUser(req, res, next) {
  signUp.read()
    .then(results => {
      res.status(200).json(results);
    }).catch(err => {
      next(err.message);
    });
}


module.exports = router;