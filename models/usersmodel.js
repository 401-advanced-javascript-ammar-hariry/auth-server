'use strict';

const userSchema = require('./user-schama');

class User {
  constructor(userSchema) {
    this.schama = userSchema;
  }
  async read(record) {
    //         let newUser = new userSchema(record);
    if (record) {
      //   console.log('<-------------------------- this is the user name ------------------------------->', record)
      let senc = await userSchema.find({ user_name: record });
      //   console.log('<-------------------------- this is the user name ------------------------------->', senc)
      return senc || null;
    } else {
      return await userSchema.find({});
    }
  }
  async create(record) {
    let newUser = new userSchema(record);
    return await newUser.save(record);
  }
}

module.exports = new User();