const express = require('express');
const app = express();
const userController = require('./controllers/user');
const propertyRequirementsController = require('./controllers/propertyRequirements');
const bidsController = require('./controllers/bids'); // Import the bids controller
const cors = require('cors');
require('dotenv').config();
const mongoose = require('./database');
const path = require('path');

app.use(cors());
app.use(express.json());

app.use('/api/public', userController);
app.use('/api/property-requirements', propertyRequirementsController);
app.use('/api/bids', bidsController); // Ensure this line is present
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});