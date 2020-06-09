'use strict';
const users = require('../auth/user-auth');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    //         console.log('=====================================================');
    next('you must log in');
    return;
  }
  const bearerToken = req.headers.authorization.split(' ').pop();
  //     console.log('this is the token=----------->', bearerToken);
  users.verifyToken(bearerToken).then(userInfo => {
    req.user = userInfo;
    next();
  }).catch(err => next('Invalid User Token'));
};