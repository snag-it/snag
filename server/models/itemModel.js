const mongoose = require('mongoose')
const { Schema } =  mongoose;


const itemSchema = new Schema({
  title: String,
  price: Number,
  img: String,
  link: String
});

module.exports = mongoose.model('itemSchema', itemSchema);