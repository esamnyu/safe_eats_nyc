const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db') // Adjust the path to your sequelize instance

class Alert extends Model {}

Alert.init({
    alertID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    camis: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    oldGrade: {
        type: DataTypes.STRING(10),
        allowNull: true // Change to false if oldGrade is always required
    },
    newGrade: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    alertDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Alert',
    timestamps: false,
    tableName: 'Alerts' // Ensure this matches the table name in your database
});

module.exports = Alert;
