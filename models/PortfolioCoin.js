const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Portfolio = require('./Portfolio');
const Coin = require('./Coin');

class PortfolioCoin extends Model {}

PortfolioCoin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        coin_id: {
           type: DataTypes.STRING,
           references: Coin.id
        },
        portfolio_id: {
            type: DataTypes.INTEGER,
            references: Portfolio.id
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'portfolio_coin',
    }
);

module.exports = PortfolioCoin;