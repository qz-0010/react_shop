const mongoose = require('mongoose');

const goodSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number
});

module.exports = mongoose.model('Good', goodSchema);
