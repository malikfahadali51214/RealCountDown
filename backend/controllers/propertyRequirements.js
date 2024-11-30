const express = require('express');
const router = express.Router();
const PropertyRequirement = require('../models/PropertyRequirement');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/', // Specify the destination folder for uploaded files
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit files to 5MB (adjust as necessary)
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|mp4/; // Allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: File type not supported!');
    }
  }
});

// Create a new property requirement
router.post('/', authenticate, upload.fields([{ name: 'imageFile' }, { name: 'videoFile' }]), async (req, res) => {
  const { 
    role, title, description, emailAddress, 
    phoneNumber, landline, contactMethod, 
    city, location, plotNumber, propertyType, 
    price, areaSize, areaSizeUnit, 
    bedrooms, bathrooms, additionalFeatures, 
    readyForPossession 
  } = req.body;

  try {
    const propertyRequirement = new PropertyRequirement({
      userId: req.user.userId,
      role,
      title,
      description,
      emailAddress,
      phoneNumber,
      landline,
      contactMethod,
      city,
      location,
      plotNumber,
      propertyType,
      price,
      areaSize,
      areaSizeUnit,
      bedrooms,
      bathrooms,
      additionalFeatures,
      readyForPossession: readyForPossession === 'true',
      imageFile: req.files['imageFile'] ? req.files['imageFile'][0].path : null,
      videoFile: req.files['videoFile'] ? req.files['videoFile'][0].path : null,
    });

    await propertyRequirement.save();
    res.status(201).json({ message: 'Property requirement created successfully!', propertyRequirement });
  } catch (error) {
    console.error('Error creating property requirement:', error);
    res.status(500).json({ message: 'Failed to create property requirement!', error: error.message });
  }
});

// Update property requirement with bidding time
router.put('/:id/bid-time', authenticate, async (req, res) => {
  const { id } = req.params;
  const { duration } = req.body; // Duration in milliseconds

  try {
    const updatedRequirement = await PropertyRequirement.findByIdAndUpdate(
      id,
      { timerEnd: Date.now() + duration },
      { new: true }
    );

    if (!updatedRequirement) {
      return res.status(404).json({ message: 'Property requirement not found!' });
    }

    res.status(200).json({ message: 'Bidding time updated successfully!', updatedRequirement });
  } catch (error) {
    console.error('Error updating bidding time:', error.message || error);
    res.status(500).json({ message: 'Failed to update bidding time!', error: error.message });
  }
});

// Update timerEnd to null when time is up
router.put('/:id/timer-end', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRequirement = await PropertyRequirement.findByIdAndUpdate(
      id,
      { timerEnd: null },
      { new: true }
    );

    if (!updatedRequirement) {
      return res.status(404).json({ message: 'Property requirement not found!' });
    }

    res.status(200).json({ message: 'Timer end updated to null successfully!', updatedRequirement });
  } catch (error) {
    console.error('Error updating timer end:', error.message || error);
    res.status(500).json({ message: 'Failed to update timer end!', error: error.message });
  }
});

// Get all property requirements for the logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const propertyRequirements = await PropertyRequirement.find({ userId: req.user.userId });
    res.status(200).json(propertyRequirements);
  } catch (error) {
    console.error('Error fetching property requirements:', error.message || error);
    res.status(500).json({ message: 'Failed to fetch property requirements!', error: error.message });
  }
});

// Get all property requirements (no user ID filter)
router.get('/all', authenticate, async (req, res) => {
  try {
    const propertyRequirements = await PropertyRequirement.find();
    res.status(200).json(propertyRequirements);
  } catch (error) {
    console.error('Error fetching all property requirements:', error.message || error);
    res.status(500).json({ message: 'Failed to fetch property requirements!', error: error.message });
  }
});

// Get property details by ID
// Get property details by ID
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const propertyRequirement = await PropertyRequirement.findById(id);
    if (!propertyRequirement) {
      return res.status(404).json({ message: 'Property requirement not found!' });
    }
    res.status(200).json(propertyRequirement);
  } catch (error) {
    console.error('Error fetching property requirement:', error.message || error);
    res.status(500).json({ message: 'Failed to fetch property requirement!', error: error.message });
  }
});

// Get bids for a specific property
router.get('/:id/bids', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const bids = await Bid.find({ propertyId: id }); // Assuming you have a Bid model
    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error.message || error);
    res.status(500).json({ message: 'Failed to fetch bids!', error: error.message });
  }
});

// Delete a property requirement by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequirement = await PropertyRequirement.findByIdAndDelete(id);
    
    if (!deletedRequirement) {
      return res.status(404).json({ message: 'Property requirement not found!' });
    }

    res.status(200).json({ message: 'Property requirement deleted successfully!' });
  } catch (error) {
    console.error('Error deleting property requirement:', error.message || error);
    res.status(500).json({ message: 'Failed to delete property requirement!', error: error.message });
  }
});

module.exports = router;