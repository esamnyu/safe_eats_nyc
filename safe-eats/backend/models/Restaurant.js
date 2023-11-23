const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db') // Ensure this path is correct

class Restaurant extends Model {}

Restaurant.init({
  camis: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  dba: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  boro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuisineDescription: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'cuisine description'
  },
  inspectionDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'inspection date'
  },
  action: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  violationCode: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'violation code'
  },
  violationDescription: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'violation description'
  },
  criticalFlag: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'critical flag'
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
    type: DataTypes.DATE,
    allowNull: true,
    field: 'grade date'
  },
  recordDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'record date'
  },
  inspectionType: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'inspection type'
  },
  latitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
  },
  communityBoard: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'community board'
  },
  councilDistrict: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'council district'
  },
  censusTract: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'census tract'
  },
  bin: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  bbl: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  nta: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Restaurant',
  timestamps: false,
  tableName: 'restaurant_inspections',
  freezeTableName: true,
});

module.exports = Restaurant;
