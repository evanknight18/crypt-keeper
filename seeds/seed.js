const sequelize = require('../config/connection');

const userData = require('./user.json');
const portfolioData = require('./portfolio.json');
const coinData = require('./coin.json');
const portfolioCoinData = require('./portfolioCoin.json');

const { User, Portfolio, Coin, PortfolioCoin } = require('../models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n------ DATABASE SYNCED -----\n');

    await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
    });
    console.log('\n------ USERS SEEDED -----\n');

    await Portfolio.bulkCreate(portfolioData);
    console.log('\n------ PORTFOLIOS SEEDED -----\n');

    await Coin.bulkCreate(coinData);
    console.log('\n------ COINS SEEDED -----\n');

    await PortfolioCoin.bulkCreate(portfolioCoinData);
    console.log('\n------ PORTFOLIO COINS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();