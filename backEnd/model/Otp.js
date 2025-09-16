const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // This tells MongoDB to automatically delete the document after 5 minutes (300 seconds)
    expires: 300, 
  },
});

module.exports = mongoose.model('Otp', otpSchema);