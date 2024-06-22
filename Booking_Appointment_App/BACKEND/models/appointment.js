const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Appointment = sequelize.define('appointment', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            len: [10, 12]
        }
    }
});

module.exports = Appointment;