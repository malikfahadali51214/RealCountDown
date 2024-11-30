const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: null, // Initially null, required later during profile update
  },
  landline: {
    type: String,
    default: null, // Initially null, required later during profile update
  },
  whatsapp: {
    type: String,
    default: null, // Initially null, required later during profile update
  },
  city: {
    type: String,
    default: null, // Initially null, required later during profile update
  },
  address: {
    type: String,
    default: null, // Initially null, required later during profile update
  },
  avatar: {
    type: String,
    default: null, // Initially null, required later during profile update
  },
  cnicFront: {
    type: String,
    default: null, // Initially null, required later during profile update
  },
  cnicBack: {
    type: String,
    default: null, // Initially null, required later during profile update
  }
});

module.exports = mongoose.model('User ', userSchema);