// models/user.js
const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../database/db');
const User = require('./userModel')

const Token = sequelize.define('Token', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    }


});

Token.belongsTo(User, {
    foreignKey: "user_id",
    as: "_userId",
    targetKey: "id",
});
User.hasMany(Token, {
    foreignKey: "user_id",
    sourceKey: "id",
});


module.exports = Token;
