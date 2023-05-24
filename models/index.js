const Coin = require('./Coin');
const Portfolio = require('./Portfolio');
const User = require('./User');

User.hasOne(Portfolio, {
    foreignKey: 'user_id'
});

Portfolio.belongsTo(User, {
    foreignKey: 'user_id'
});

Portfolio.hasMany(Coin, {
    foreignKey: 'coin_id',
    onDelete: 'CASCADE'
});

Coin.belongsTo(Portfolio, {
    foreignKey: 'id'
});

module.exports = { Coin, Portfolio, User};