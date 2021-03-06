'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userread = require('../models/usersmodel');
require('dotenv').config();

const SECRET = process.env.SECRET;
let role = {
  Regular_users: ['READ'],
  Writers: ['READ', 'CREATE'],
  Editors: ['READ', 'CREATE', 'UPDATE'],
  Administrators: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
};
let users = {};
users.saveHash = async function(record) {

  let dataRexord = await userread.read(record.user_name);
  //   console.log('------------------------>', dataRexord);
  if (!dataRexord[0]) {
    record.password = await bcrypt.hash(record.password, 5);
    return record;
  } else {
    console.error('it is already exists');
    return dataRexord;

  }
};
// mongodb://localhost:27017/user-auth-db 
users.authenticateBasic = async function(user, pass) {
  //     let de = await bcrypt.hash(record.password, 5);
  const dataRexord = await userread.read(user);
  //   console.log('the record ---------------------->', dataRexord);
  //   console.log('the record ---------------------->', dataRexord[0].user_name);

  let valid = await bcrypt.compare(pass, dataRexord[0].password);
  return valid ? dataRexord : Promise.reject();
};

users.getToken = function(user) {
  let token = jwt.sign({ user_name: user.user_name, capabilities: role[user.role] }, SECRET);
  //     console.log('------------------------>', token);
  return token;
};

users.verifyToken = async function(token) {

  return jwt.verify(token, SECRET, async function(err, decoded) {
    if (err) {
      console.log('Error :INVALID SECRET OR TOKEN ');
      return Promise.reject(err);
    }
    //         console.log('decoded+++++++++++++++++++++++++++++++>', decoded);
    let username = decoded.user_name;
    //         console.log('username+++++++++++++++++++++++++++++++>', username);
    let dataRexord = await userread.read(username);
    //         console.log('data base 222 +++++++++++++++++++++++++++++++>', dataRexord);
    if (dataRexord) {
      return Promise.resolve(decoded);
    }
    return Promise.reject();
  });

};

module.exports = users;