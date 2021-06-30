const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
  searchedItem: { type: String },
  createdAt: { type: Date, expires: 30, default: Date.now },
  results: { type: Object },
});

module.exports = mongoose.model('history', historySchema);
