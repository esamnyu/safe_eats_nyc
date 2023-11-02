const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const sequelize = require('./db');
const Violation = require('./models/Violation');
const Restaurant = require('./models/Restaurant'); // Ensure this path is correct
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
// Search for Restaurants Endpoint
app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    // Use the query to search your database for restaurants
    const results = await Restaurant.findAll({
      where: {
        dba: sequelize.where(sequelize.fn('LOWER', sequelize.col('dba')), 'LIKE', '%' + query.toLowerCase() + '%')
      },
      limit: 10 // Limit the results to 10
    });
    // Send the results as a response
    res.json({ results });
  } catch (error) {
    console.error('Error searching for restaurants:', error);
    res.status(500).send('Internal Server Error');
  }
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
const PORT = process.env.PORT || 3001; // changed from 3000 to 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
