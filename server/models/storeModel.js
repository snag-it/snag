const mongoose = require('mongoose');
const { Schema } = mongoose;



const targetModel = new Schema({
  productData : [itemSchema]
});

const amazonModel = new Schema({
  productData : [itemSchema]
});

const ebayModel = new Schema({
  productData : [itemSchema]
});






// You must export your model through module.exports
// The collection name should be 'student'
module.exports = 
  mongoose.model('amazonModel', amazonModel), 
  mongoose.model('ebayModel', ebayModel), 
  mongoose.model('targetModel', targetModel)
