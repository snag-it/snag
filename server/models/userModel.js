const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: String,
  lastname: String,
  email: String,
  //   history:
  //   favorites:

  //add in favorites or history here
  //favorites:
  //id
  //retailer
  //title
  //price
  //imgurl
});

//ask if we need any encryption and password comparison here

module.exports = mongoose.model("User", userSchema);
