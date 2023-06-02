const axios = require('axios');
const router = require('express').Router();
const { Portfolio, User, Coin } = require('../../models');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');

// Get user's portfolio with associted coins
router.get('/:id', async (req, res) => {
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
router.post('/:id/coin', async (req, res) => {
  try {
    const portfolio = await Portfolio.findAll({
      where: { user_id: req.params.id },
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
router.delete('/:id/coin', async (req, res) => {
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

module.exports = router;
