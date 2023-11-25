const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../db') // Ensure this path is correct

class Subscription extends Model {}

Subscription.init({
    subscriptionid: { // Previously subscriptionID
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    camis: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subscriptiondate: { // Make sure this matches the exact column name in DB
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscriptions', // Make sure this is the exact table name in DB
    timestamps: false
});


module.exports = Subscription;
