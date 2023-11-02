const Restaurant = require('./Restaurant');
const Violation = require('./Violation');

Restaurant.hasMany(Violation, { foreignKey: 'camis' });
Violation.belongsTo(Restaurant, { foreignKey: 'camis' });
