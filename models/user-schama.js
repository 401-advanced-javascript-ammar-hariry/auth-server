'use strict';

const mongoose = require('mongoose');

const user = mongoose.Schema({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String },
});


module.exports = mongoose.model('user', user);