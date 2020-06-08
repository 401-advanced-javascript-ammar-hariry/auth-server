'use strict';

const express = require('express');
const oauth = require('../middleware/oauth-middleware');
const router = express.Router();

router.get('/oauth', oauth, oauthHandler);

function oauthHandler(req, res) {
  //     console.log('---------------im here------------------------');
  res.status(200).send(req.token);
}
module.exports = router;