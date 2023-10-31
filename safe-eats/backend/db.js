// backend/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('restaurant_inspections', 'your_user', 'Es91110291!', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
