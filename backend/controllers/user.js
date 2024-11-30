const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate'); // Import authenticate middleware
const multer = require('multer'); // Import multer for image upload

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Set the destination for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename to include timestamp
  }
});

const upload = multer({ storage: storage });

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, cnic, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ message: 'User  with this email already exists!' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      name,
      email,
      cnic,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET);

    res.status(201).json({ message: 'User  registered successfully!', token, user: newUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Failed to register user!' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User  not found!' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password!' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

    res.status(200).json({ message: 'User  logged in successfully!', token, user });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Failed to login user!' });
  }
});

// Get logged-in user's details
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User  not found!' });
    }
    // Return all required fields
    res.status(200).json({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      landline: user.landline,
      whatsapp: user.whatsapp,
      city: user.city,
      address: user.address,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details!' });
  }
});

// Update user profile
router.put('/profile', authenticate, upload.fields([{ name: 'cnicFront', maxCount: 1 }, { name: 'cnicBack', maxCount: 1 }, { name: 'avatar', maxCount: 1 }]), async (req, res) => {
  const { name, mobile, landline, whatsapp, city, address } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User  not found!' });
    }

    // Validate profile data
    if (!mobile || !landline || !whatsapp || !city || !address || !name) {
      return res.status(400).json({ message: 'All fields (name, mobile, landline, whatsapp, city, address) must be provided' });
    }

    // Update user profile fields
    user.name = name;
    user.mobile = mobile;
    user.landline = landline;
    user.whatsapp = whatsapp;
    user.city = city ;
    user.address = address;

    // Update CNIC images if provided
    if (req.files.cnicFront) {
      user.cnicFront = req.files.cnicFront[0].filename;
    }
    if (req.files.cnicBack) {
      user.cnicBack = req.files.cnicBack[0].filename;
    }
    
    // Update avatar if provided
    if (req.files.avatar) {
      user.avatar = req.files.avatar[0].filename;
    }

    // Save the updated user profile
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile!', error: error.message });
  }
});

// Get user's profile data
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json ({ message: 'User     not found!' });
    }
    res.status(200).json({
      mobile: user.mobile,
      landline: user.landline,
      whatsapp: user.whatsapp,
      city: user.city,
      address: user.address,
      cnicFront: user.cnicFront,
      cnicBack: user.cnicBack,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details!' });
  }
});





// Change user password
// Change user password
router.put('/change-password', authenticate, async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User  not found!' });
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect!' });
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match!' });
    }

    // Hash the new password
    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password changed successfully!' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Failed to change password!' });
  }
});

module.exports = router;