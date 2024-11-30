// controllers/bids.js
const express = require('express');
const Bid = require('../models/Bid'); // Assuming you have a Bid model
const authenticate = require('../middleware/authenticate'); // Assuming you have an authentication middleware
const router = express.Router();

// Create a new bid
router.post('/', authenticate, async (req, res) => {
  const { propertyId, bidAmount } = req.body;

  try {
    const bid = new Bid({
      agentId: req.user.userId, // Assuming you have the user ID in req.user
      propertyId,
      bidAmount,
    });

    await bid.save();
    res.status(201).json({ message: 'Bid created successfully!', bid });
  } catch (error) {
    console.error('Error creating bid:', error);
    res.status(500).json({ message: 'Failed to create bid!' });
  }
});

// Fetch bids for a specific property
router.get('/:propertyId', async (req, res) => {
  try {
    const bids = await Bid.find({ propertyId: req.params.propertyId }).populate('agentId', 'name'); // Populate with agent name
    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ message: 'Failed to fetch bids!' });
  }
});

module.exports = router;