'use strict';

const express = require('express');
const users = require('../auth/user-auth');
const signUp = require('../models/usersmodel');
const router = express.Router();

router.post('/signup', signUpUser);

function signUpUser(req, res, next) {
  //     console.log("I'm here ------------------------------->");

  let userInfo = req.body;
  //     console.log("I'm here ------------------------------->", userInfo);

  users.saveHash(userInfo)
    .then(saveInfo => {
      //        console.log("I'm here ------------------------------->", saveInfo);

      signUp.create(saveInfo)
        .then(user => {
          let token = users.getToken(user);
          let day = 86400000;
          // console.log("I'm here ------------------------------->", token);
          res.cookie('remember token', token, {
            expires: new Date(Date.now() + day), //the expire date by millisecom]nd from the current date (1day)
            httpOnly: true,
          });
          res.status(201).send(token);
        }).catch(err => {
          res.status(403).send('Invalid Signup! email is taken');
        });
    });
}




module.exports = router;