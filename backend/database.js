const mongoose = require('mongoose');

const uri = 'mongodb+srv://13075:13075@cluster0.y545smj.mongodb.net/'; // Replace with your actual URI

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });