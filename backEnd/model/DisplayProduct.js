const mongoose = require('mongoose');

const DisplayProductSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'Image URL is required.'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DisplayProduct', DisplayProductSchema);