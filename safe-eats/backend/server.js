const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const sequelize = require('./db');
const Violation = require('./models/Violation');// Make sure the path is correct
require('./models/Restaurant');
require('./models/Violation');
require('./models/associations');


// Load environment variables
config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Homepage Endpoint
app.get('/homepage', (req, res) => {
  // Fetch or define your educational content and highlights of common inspection issues
  // Send them as a response
  res.json({ content: 'Educational Content', highlights: 'Common Issues' });
});

// Search for Restaurants Endpoint
app.get('/search', (req, res) => {
  const { query } = req.query;
  // Use the query to search your database for restaurants
  // Send the results as a response
  res.json({ results: 'Search Results' });
});

// Violations Page Endpoint
app.get('/violations', async (req, res) => {
  try {
    const violations = await Violation.findAll();
    res.json({ violations });
  } catch (error) {
    console.error('Error fetching violations:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('Safe Eats NYC Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
