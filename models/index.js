const Coin = require('./Coin');
const Portfolio = require('./Portfolio');
const User = require('./User');
const PortfolioCoin = require('./PortfolioCoin');

Portfolio.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Portfolio, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Coin.belongsToMany(Portfolio, {
    through: PortfolioCoin
});

Portfolio.belongsToMany(Coin, {
    through: PortfolioCoin
});

module.exports = { Coin, Portfolio, User, PortfolioCoin};