'use strict';

const express = require('express');
const basicAuth = require('../middleware/BasicAuthentication');
const router = express.Router();

router.post('/signin', basicAuth, signinUser);

function signinUser(req, res) {
  res.status(201).send(req.token);
}

module.exports = router;