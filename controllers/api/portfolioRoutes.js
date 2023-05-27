const axios = require('axios');
const router = require('express').Router();
const { Portfolio } = require('../../models');
const withAuth = require('../../utils/auth');

// Get user's portfolio with real-time prices
router.get('/', withAuth, async (req, res) => {
  try {
    const portfolioData = await Portfolio.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const portfolio = portfolioData.map((coin) => coin.get({ plain: true }));

    for (let coin of portfolio) {
      const response = await axios.get(`INSERT API URL`);
      coin.price = response.data[coin.name].usd;
    }

    res.json(portfolio);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a coin to user's portfolio
router.post('/', withAuth, async (req, res) => {
  try {
    // Fetch the real-time price of the coin from the CoinGecko API
    const response = await axios.get(`INSERT API URL`);
    const price = response.data[req.body.name].usd;

    const newCoin = await Portfolio.create({
      ...req.body,
      user_id: req.session.user_id,
      price: price,
    });

    res.status(200).json(newCoin);
  } catch (err) {
    res.status(400).json(err);
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
