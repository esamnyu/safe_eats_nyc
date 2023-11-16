const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const sequelize = require('./db');
const Violation = require('./models/Violation');
const Restaurant = require('./models/Restaurant');
require('./models/associations');

config();

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

app.get('/', (req, res) => {
    res.send('Safe Eats NYC Backend is running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
