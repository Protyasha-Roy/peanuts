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

const IP = mongoose.model('IP', ipSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to verify access based on IP address
app.post('/verify-access', async (req, res) => {
  try {
    const userIP = req.body.ipAddress;

    // Replace 'your-ip-address' with your actual IP address
    const allowedIP = process.env.MY_IP;
    const alternativeIp = process.env.ALTERNATIVE_IP

    if (userIP === allowedIP || userIP === alternativeIp) {
      res.sendStatus(200); // Access granted
    } else {
      res.sendStatus(403); // Access forbidden
    }
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500); // Internal server error
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
