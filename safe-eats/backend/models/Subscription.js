const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust the path to your sequelize instance

class Subscription extends Model {}

Subscription.init({
    subscriptionID: {
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
    subscriptionDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Subscription',
    timestamps: false,
    tableName: 'Subscriptions' // Ensure this matches the table name in your database
});

module.exports = Subscription;
