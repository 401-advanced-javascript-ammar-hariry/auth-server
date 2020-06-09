'use strict';
const base64 = require('base-64');
const users = require('../auth/user-auth');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    //         console.log('=====================================================');
    next('Invalid Login');
  } else {
    //         console.log('=======================here==============================', req.headers.authorization);
    const basic = req.headers.authorization.split(' ').pop();
    //         console.log('=======================here 2222222==============================', basic);

    const [user, pass] = base64.decode(basic).split(':');
    //         console.log('=======================here 33333333==============================', [user, pass]);
    users.authenticateBasic(user, pass)
      .then(validator => {
        req.token = users.getToken(validator[0]);
        //       console.log('=======================here 44444444444==============================', validator);
        next();
      }).catch(err => {
        next('you must sign up');
      });
  }
};