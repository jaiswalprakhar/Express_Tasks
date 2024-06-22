const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-appointment-app', 'root', 'Anmol$98', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;