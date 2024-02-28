const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define schema for storing IP addresses
const ipSchema = new mongoose.Schema({
  ipAddress: String,
});

// Define schema for storing form data
const formDataSchema = new mongoose.Schema({
  type1: String,
  type2: String,
  relationshipFacts: [String],
  relationshipRoles: String,
  movieNames: [String],
  bookNames: [String],
  animeNames: [String]
});


const IP = mongoose.model('IP', ipSchema);
const FormData = mongoose.model('FormData', formDataSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to verify access based on IP address
app.post('/verify-access', async (req, res) => {
  try {
    const userIP = req.body.ipAddress;

    // Replace 'your-ip-address' with your actual IP address
    const allowedIP = process.env.MY_IP;
    const alternativeIp = process.env.ALTERNATIVE_IP;
    const alternativeIp2 = process.env.ALTERNATIVE_IP2;

    if (userIP === allowedIP || userIP === alternativeIp || userIP === alternativeIp2) {
      res.sendStatus(200); // Access granted
    } else {
      res.sendStatus(403); // Access forbidden
    }
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500); // Internal server error
  }
});


// Route to handle form data submission
app.post('/upload-data', async (req, res) => {
    try {
        // Extract form data from request body
        const { type1, type2, relationshipFacts, relationshipRoles, movieNames, bookNames, animeNames } = req.body;

        // Create new FormData document
        const formData = new FormData({
            type1,
            type2,
            relationshipFacts,
            relationshipRoles,
            movieNames,
            bookNames,
            animeNames
        });

        // Save form data to MongoDB
        await formData.save();

        // Respond with success message
        res.status(200).json({ message: 'Form data uploaded successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to handle the GET request for compatibility calculation
app.get('/calculate-compatibility', async (req, res) => {
  try {
      // Retrieve MBTI types from query parameters
      const yourMbtiType = req.query.yourMbtiType;
      const partnerMbtiType = req.query.partnerMbtiType;

      // Query the database to find matching MBTI types
      const formData = await FormData.findOne({ type1: yourMbtiType, type2: partnerMbtiType });

      if (formData) {
          // If matching data is found, send it back to the client
          res.json(formData);
      } else {
          // If no matching data is found, send a 404 Not Found response
          res.status(404).json({ error: 'Compatibility data not found' });
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
