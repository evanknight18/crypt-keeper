const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');
const Coin = require('./Coin');

class Portfolio extends Model {}

Portfolio.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        portfolio_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        value: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        coin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: Coin.id
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: User.id
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
);

module.exports = Portfolio;