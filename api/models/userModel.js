// models/user.js
const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('User', {
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // numbers: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     // defaultValue: []
    // },
    numbers: {
        type: DataTypes.JSON,
        allowNull: false,
        // defaultValue: []
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = User;
