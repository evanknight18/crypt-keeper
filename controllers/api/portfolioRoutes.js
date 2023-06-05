const axios = require('axios');
const router = require('express').Router();
const { Portfolio, User, Coin } = require('../../models');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');

// Get user's portfolio with associted coins
router.get('/:id', withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll({
      where: { user_id: req.params.id },
      include: [{ model: User }, { model: Coin }]
    });
    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a coin to user's portfolio
router.post('/:id/coin', withAuth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User }, { model: Coin }]
    });
    const newCoin = { coin_name: req.body.coin_name, price: req.body.price };
    let exists = portfolio[0].coins.filter(coin => coin.coin_name === newCoin.coin_name);
    const addCoin = exists;
    console.log(addCoin);

    if (addCoin.coin_name === newCoin.coin_name) {
      res.json({message: `Coin ${newCoin.coin_name} already exists` });
    } else {
      await portfolio[0].createCoin(newCoin);
      res.status(200).json({message: `Coin ${newCoin.coin_name} added successfully!` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a coin from user's portfolio
router.delete('/:id/coin', withAuth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findAll({
      where: { user_id: req.params.id },
      include: [{ model: User }, { model: Coin }]
    });

    const deleteCoin = req.body;
    let exists = portfolio[0].coins.filter(coin => coin.coin_name === deleteCoin.coin_name);
    const removeCoin = exists[0];

    if (exists[0].coin_name === deleteCoin.coin_name) {
      await portfolio[0].removeCoin(removeCoin);
      res.status(200).json({message: `${deleteCoin.coin_name} deleted from portfolio`});
    } else {
      res.status(200).json({message: `${deleteCoin.coin_name} not found in portfolio` });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// Sell a coin from user's portfolio
router.post('/:id/sell', withAuth, async (req, res) => {
  try {
    const { coinId, quantity } = req.body;
    const portfolio = await Portfolio.findOne({ where: { user_id: req.params.id } });
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    const coinIndex = portfolio.coins.findIndex(c => c.coinId === coinId);
    if (coinIndex === -1) {
      return res.status(404).json({ error: 'Coin not found in portfolio' });
    }
    if (portfolio.coins[coinIndex].quantity < quantity) {
      return res.status(400).json({ error: 'Not enough coins to sell' });
    }
    portfolio.coins[coinIndex].quantity -= quantity;
    if (portfolio.coins[coinIndex].quantity === 0) {
      portfolio.coins.splice(coinIndex, 1);
    }
    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
