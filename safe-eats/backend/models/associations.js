const Restaurant = require('./Restaurant');
const Violation = require('./Violation');
const User = require('./User'); // Assuming you have a User model
const Subscription = require('./Subscription');
const Alert = require('./Alert');

// Existing Associations
Restaurant.hasMany(Violation, { foreignKey: 'camis' });
Violation.belongsTo(Restaurant, { foreignKey: 'camis' });

// Subscription Associations
User.hasMany(Subscription, { foreignKey: 'userID' });
Subscription.belongsTo(User, { foreignKey: 'userID' });

Restaurant.hasMany(Subscription, { foreignKey: 'camis' });
Subscription.belongsTo(Restaurant, { foreignKey: 'camis' });

// Alert Associations
User.hasMany(Alert, { foreignKey: 'userID' });
Alert.belongsTo(User, { foreignKey: 'userID' });

Restaurant.hasMany(Alert, { foreignKey: 'camis' });
Alert.belongsTo(Restaurant, { foreignKey: 'camis' });
