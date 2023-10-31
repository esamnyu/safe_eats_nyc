// backend/models/Violation.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Restaurant = require('./Restaurant.js'); // Make sure you have this file and model setup

const Violation = sequelize.define('violation', {
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  criticalFlag: {
    type: DataTypes.STRING,
    allowNull: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gradeDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  recordDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  inspectionType: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Violation;
