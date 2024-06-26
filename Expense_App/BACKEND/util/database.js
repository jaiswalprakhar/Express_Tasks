const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'root', 'Anmol$98', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;