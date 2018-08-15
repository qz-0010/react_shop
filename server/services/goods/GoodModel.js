const mongoose = require('mongoose');

const goodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'required']
  },
  image: {
    type: String,
    default: 'http://placekitten.com/400/300'
  },
  price: {
    type: Number,
    required: [true, 'required']
  }
});

module.exports = mongoose.model('Good', goodSchema);
