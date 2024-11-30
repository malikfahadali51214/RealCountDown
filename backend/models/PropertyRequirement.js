const mongoose = require('mongoose');

const propertyRequirementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User ',
  },
  title: String,
  description: String,
  role: String,
  emailAddress: String,
  phoneNumber: String,
  landline: String,
  contactMethod: String,
  city: String,
  location: String,
  plotNumber: String,
  propertyType: String,
  price: Number,
  areaSize: Number,
  areaSizeUnit: String,
  bedrooms: Number,
  bathrooms: Number,
  additionalFeatures: [String],
  readyForPossession: Boolean,
  imageFile: String,
  videoFile: String,
  timerEnd: {
    type: Date,
    default: null, // Initialize timerEnd to null
  },
}, { timestamps: true });

module.exports = mongoose.model('PropertyRequirement', propertyRequirementSchema);