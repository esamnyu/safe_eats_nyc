const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');
const Violation = require('./models/Violation');
const Restaurant = require('./models/Restaurant');
const Subscription = require('./models/Subscription');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const Alert = require('./models/Alert');

require('./models/associations');


const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.get('/homepage', (req, res) => {
    res.json({ content: 'Educational Content', highlights: 'Common Issues' });
});

// Updated Search Endpoint with Filters
app.get('/search', async (req, res) => {
    const { query, boro, cuisine, grade, scoreMin, scoreMax, dateFrom, dateTo } = req.query;
    try {
        let whereConditions = sequelize.where(sequelize.fn('LOWER', sequelize.col('dba')), 'LIKE', `%${query.toLowerCase()}%`);
        
        if (boro) {
            whereConditions = sequelize.and(whereConditions, { boro });
        }
        if (cuisine) {
            whereConditions = sequelize.and(whereConditions, { 'cuisine_description': cuisine });
        }
        if (grade) {
            whereConditions = sequelize.and(whereConditions, { grade });
        }
        if (scoreMin !== undefined && scoreMax !== undefined) {
            whereConditions = sequelize.and(whereConditions, sequelize.where(sequelize.col('score'), 'BETWEEN', scoreMin, scoreMax));
        }
        if (dateFrom && dateTo) {
            whereConditions = sequelize.and(whereConditions, sequelize.where(sequelize.col('inspection_date'), 'BETWEEN', new Date(dateFrom), new Date(dateTo)));
        }

        const results = await Restaurant.findAll({
            where: whereConditions,
            limit: 10,
        });

        res.json({ results });
    } catch (error) {
        console.error('Error searching for restaurants:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/violations', async (req, res) => {
    try {
        const violations = await Violation.findAll();
        res.json({ violations });
    } catch (error) {
        console.error('Error fetching violations:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Subscribe to a restaurant
app.post('/subscribe', async (req, res) => {
    const { userId, camis } = req.body;
    
    try {
      await Subscription.create({ userId, camis });
      res.status(200).send('Subscription created successfully.');
    } catch (error) {
      console.error('Error creating subscription:', error);
      res.status(500).send('Error creating subscription.');
    }
  });

app.get('/', (req, res) => {
    res.send('Safe Eats NYC Backend is running!');
});
// Fetch user alerts
app.get('/user-alerts', async (req, res) => {
    const userId = req.query.userId; // Adjust based on how you're getting user ID
  
    try {
      const alerts = await Alert.findAll({
        where: { userId }
      });
      res.status(200).json(alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      res.status(500).send('Error fetching alerts.');
    }
  });

// Endpoint to trigger grade change alerts (for demonstration purposes)
app.post('/trigger-alert', async (req, res) => {
    const { camis, oldGrade, newGrade } = req.body;
  
    try {
      // Find all users subscribed to this restaurant
      const subscriptions = await Subscription.findAll({
        where: { camis }
      });
  
      // Create an alert for each subscribed user
      for (const subscription of subscriptions) {
        await Alert.create({
          userId: subscription.userId,
          camis,
          oldGrade,
          newGrade
        });
      }
  
      res.status(200).send('Alerts triggered successfully.');
    } catch (error) {
      console.error('Error triggering alerts:', error);
      res.status(500).send('Error triggering alerts.');
    }
  });

  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.get('/protected-route', authenticateToken, (req, res) => {
    // Access user from req.user
    res.json({ content: 'Protected content' });
});

  
// User Registration
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Error during registration.');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send('Invalid credentials.');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login.');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
