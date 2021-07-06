module.exports = {
  connectDB: require('../config/db'),
  Camp: require('./Camp'),
  User: require('./User'),
  mongoose: require('mongoose'),
};
