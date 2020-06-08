'use strict';
const users = require('../auth/user-auth');
const superagent = require('superagent');
const signUp = require('../models/usersmodel');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const remoteUserApi = 'https://api.github.com/user';
const API_SERVER = 'http://localhost:3000/oauth';

const apiTokenUri = 'https://github.com/login/oauth/access_token';

module.exports = async(req, res, next) => {
  try {
    let code = req.query.code;
    let remoteToken = await getExchangToken(code);
    let remotUser = await getRemoteUserInfo(remoteToken);
    let [user, token] = await getUser(remotUser);
    req.user = user;
    req.token = token;
    //         console.log('-----------here---------------', user);
    //         console.log('-----------here---------------', token);
    next();
  } catch (err) {
    console.log(`ERROR: ${err}`);
    next('ERROR');
  }
};


async function getExchangToken(code) {
  let tokenRes = await superagent.post(apiTokenUri)
    .send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: API_SERVER,
      code: code,
    });
    //     console.log('-----------here- 2222--------------', tokenRes.body);
  let access_token = tokenRes.body.access_token;
  return access_token;
}


async function getRemoteUserInfo(token) {
  let userRes = await superagent.get(remoteUserApi)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'express-app');
    //     console.log('-----------here 3---------------', userRes.body);
  let user = userRes.body;
  return user;
}

async function getUser(remoteUser) {
  let userRecord = {
    user_name: remoteUser.login, // this will be my email
    password: 'newoauthpassword',
  };
    //     console.log('-----------here 3---------------', userRecord);
  let saveUser = await users.saveHash(userRecord);
  let myServerToken = await users.getToken(userRecord);
  let dataRexord = await signUp.read(saveUser.user_name);
  if (!dataRexord[0]) {
    let databaseSave = await signUp.create(saveUser);
    return [databaseSave, myServerToken];
  } else {
    console.error('you login with this acount!');
    return [saveUser, myServerToken];
  }


  //     console.log('here the user ================> ', saveUser);
  //     console.log('here the token ================> ', myServerToken);


}