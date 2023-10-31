// backend/models/Restaurant.js
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Violation = require('./Violation.js');

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
    building: {
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
    },
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
    },
    councilDistrict: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    censusTract: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
