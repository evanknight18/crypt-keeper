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

module.exports = router;