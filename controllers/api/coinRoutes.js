const router = require('express').Router();
const axios = require('axios');
const withAuth = require('../../utils/auth');
const coins = require('../../seeds/coin.json');

//Get all coin prices (render not working)
router.get('/price', withAuth, async (req, res) => {
  try {
    const coinsArray = [];

    for (const coin in coins) {
      coinsArray.push(coins[coin].coin_name);
    }

    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinsArray.join('%2C')}&vs_currencies=usd`, {
      params: {
        _limit: 10,
      },
    });

    const priceObj = response.data;
    const coinPriceArr = [];
    
    for (const price in priceObj) {
      coinPriceArr.push(priceObj[price].usd)
    }
    console.log(coinsArray + ' ' + coinPriceArr);
    if (coinPriceArr) {
      res.render('dashboard', {
        ...coinPriceArr
      });
    } else {
      res.status(404).json({ message: 'Coins not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Get real-time price of a specific coin
router.get('/:id/price', withAuth, async (req, res) => {
  try {
    let coinsArray = [];

    for (const coin in coins) {
      coinsArray.push(coins[coin].coin_name);
    }
    // console.log(coinsArray);
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinsArray[req.params.id - 1]}&vs_currencies=usd`, {
      params: {
        _limit: 1,
      },
    });
    console.log(response.data[coinsArray[req.params.id - 1]].usd);

    if (response.data[coinsArray[req.params.id - 1]].usd) {
      res.json(response.data[coinsArray[req.params.id - 1]].usd);
    } else {
      res.status(404).json({ message: 'Coin not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
