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
        quantity: {
            type: DataTypes.DECIMAL(5, 4),
            defaultValue: 10,
            allowNull: false,
        },
        coin_id: {
           type: DataTypes.INTEGER,
           references: {
               model: 'coin',
               key: 'id'
           }
        },
        portfolio_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'portfolio',
                key: 'id'
            }
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