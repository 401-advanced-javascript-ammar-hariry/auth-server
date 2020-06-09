'use strict';

const express = require('express');
const bearer = require('../middleware/bearer-auth');
const router = express.Router();

router.get('/secret', bearer, secretRout);

function secretRout(req, res) {
  let token = req.token;
  let day = 86400000;
  // console.log("I'm here ------------------------------->", token);
  res.cookie('remember token', token, {
    expires: new Date(Date.now() + day), //the expire date by millisecom]nd from the current date (1day)
    httpOnly: true,
  });
  res.status(200).json(req.user);
}


module.exports = router;