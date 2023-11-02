const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ensure this path is correct


const Violation = sequelize.define('Violation', {
  inspectionDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  violationCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  violationDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  criticalFlag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gradeDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  recordDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  inspectionType: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Violation;