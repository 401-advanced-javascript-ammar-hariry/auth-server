'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userread = require('../models/usersmodel');
require('dotenv').config();

const SECRET = process.env.SECRET;

let users = {};
users.saveHash = async function(record) {

  let dataRexord = await userread.read(record.user_name);
  //     console.log('------------------------>', record);
  //     console.log('the record ---------------------->', dataRexord);
  if (record.user_name !== dataRexord) {
    record.password = await bcrypt.hash(record.password, 5);
    return record;
  } else {

    return Promise.reject();
  }
};

users.authenticateBasic = async function(user, pass) {
  //     let de = await bcrypt.hash(record.password, 5);
  const dataRexord = await userread.read(user);
  console.log('the record ---------------------->', dataRexord[0].user_name);
  console.log('the record ---------------------->', dataRexord);

  let valid = await bcrypt.compare(pass, dataRexord[0].password);
  return valid ? dataRexord : Promise.reject();
};

users.getToken = function(user) {
  let token = jwt.sign({ user_name: user.user_name }, SECRET);
  //     console.log('------------------------>', token);
  return token;
};

module.exports = users;