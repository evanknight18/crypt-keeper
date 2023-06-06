const Coin = require('./Coin');
const Portfolio = require('./Portfolio');
const User = require('./User');
const PortfolioCoin = require('./PortfolioCoin');

User.hasOne(Portfolio, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Portfolio.belongsTo(User, {
    foreignKey: 'user_id'
});

Coin.belongsToMany(Portfolio, {
    through: PortfolioCoin
});

Portfolio.belongsToMany(Coin, {
    through: PortfolioCoin
});

module.exports = { Coin, Portfolio, User, PortfolioCoin};