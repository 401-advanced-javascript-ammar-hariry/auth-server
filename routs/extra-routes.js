'use strict';

const express = require('express');
const bearer = require('../middleware/bearer-auth');
const acl = require('../middleware/acl-middleware');
const router = express.Router();

router.get('/secret', bearer, secretRout);
router.get('/read', bearer, acl('READ'), readHandler);
router.post('/add', bearer, acl('CREATE'), createHandler);
router.put('/change', bearer, acl('UPDATE'), updateHandler);
router.delete('/remove', bearer, acl('DELETE'), deleteHandler);

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

function createHandler(req, res) {
  let token = req.token;
  let day = 86400000;
  res.cookie('remember token', token, {
    expires: new Date(Date.now() + day),
    httpOnly: true,
  });
  res.status(200).send('ALLOWED CREATING');
}

function updateHandler(req, res) {
  let token = req.token;
  let day = 86400000;
  res.cookie('remember token', token, {
    expires: new Date(Date.now() + day),
    httpOnly: true,
  });
  res.status(200).send('ALLOWED CHANGE');
}

function deleteHandler(req, res) {
  let token = req.token;
  let day = 86400000;
  res.cookie('remember token', token, {
    expires: new Date(Date.now() + day),
    httpOnly: true,
  });
  res.status(200).send('ALLOWED TO DELETE');
}

function readHandler(req, res) {

  let token = req.token;
  let day = 86400000;
  res.cookie('remember token', token, {
    expires: new Date(Date.now() + day),
    httpOnly: true,
  });
  res.status(200).send('ALLOWED READING');
}

module.exports = router;