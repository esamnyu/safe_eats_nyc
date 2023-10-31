const Restaurant = require('./restaurant');
const Violation = require('./Violation');

Restaurant.hasMany(Violation);
Violation.belongsTo(Restaurant);
