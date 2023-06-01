const axios = require('axios');
const router = require('express').Router();
const { Portfolio, User, Coin } = require('../../models');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');

// Get user's portfolio with associted coins
router.get('/:id', async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [{ model: User }, { model: Coin }]
    });
    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a coin to user's portfolio
router.post('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findAll({
      where: { user_id: req.params.id },
      include: [{ model: User }, { model: Coin }]
    });
    const newCoin = { coin_name: req.body.coin_name, price: req.body.price };
    let exists = portfolio[0].coins.filter(coin => coin.coin_name === newCoin.coin_name);
    if (exists === newCoin) {
      res.json({message: `Coin already added ${newCoin.coin_name}` });
    } else {
      console.log(`trying to add coin ${newCoin.coin_name + newCoin.price}` );
      await portfolio[0].createCoin(newCoin);
      res.status(200).json({message: `Coin ${newCoin.coin_name} added successfully!` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a coin from user's portfolio
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!portfolioData) {
      res.status(404).json({ message: 'No portfolio found with this id!' });
      return;
    }

    res.status(200).json(portfolioData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
