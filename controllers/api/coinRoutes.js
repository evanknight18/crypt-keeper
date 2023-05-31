const router = require('express').Router();
const axios = require('axios');
const withAuth = require('../../utils/auth');

// Get real-time price of a specific coin
router.get('/price/:id', withAuth, async (req, res) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${req.params.id}&vs_currencies=usd`);
    if (response.data[req.params.id]) {
      res.json(response.data[req.params.id].usd);
    } else {
      res.status(404).json({ message: 'Coin not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Buy a coin
router.post('/buy', withAuth, async (req, res) => {
  try {
    const newCoin = await Coin.create({
      user_id: req.session.user_id,
      coin_id: req.body.coin_id,
      quantity: req.body.quantity,
    });

    res.status(200).json(newCoin);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Sell a coin
router.post('/sell', withAuth, async (req, res) => {
  try {
    const coinData = await Coin.destroy({
      where: {
        user_id: req.session.user_id,
        coin_id: req.body.coin_id,
      },
    });

    if (!coinData) {
      res.status(404).json({ message: 'No coin found with this id owned by the user' });
      return;
    }

    res.status(200).json(coinData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;