const router = require('express').Router();
const {User, Portfolio, Coin, PortfolioCoin} = require('../models');
const { Configuration, OpenAIApi } = require("openai");
const coins = require('../seeds/coin.json');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get('/', async (req, res) => {
  try {
    // GPT is very slow, but works - comment out for speed
    // let coins = ['bitcoin', 'ethereum'];
    // const gpt = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: `My cryptocurrency portfolio holds ${coins}. As of the year 2023, give me predictions for the coins in my portfolio and recent news for each coin. Finally, suggest one cryptocurrency that is worth researching more about. Please format your response in neat html, using <h3> for the headers of each section, breaks after each section, and with no html head.`,
    //     temperature: 1.2,
    //     max_tokens: 2048,
    //     // top_p: 1.0,
    //     n: 1,
    //     frequency_penalty: 0.0,
    //     presence_penalty: 0.0,
    //     stop: ["\"\"\""],
    // });
    // const resGPT = gpt.data.choices[0].text;

    const portfolioData = await Portfolio.findAll({
      where: { user_id: req.session.user_id },
        include: [
        { model: User, attributes: ['user_name'] },
        { model: Coin }
      ],
    });
    
    const portfolioCoinData = await PortfolioCoin.findAll({
        where: { portfolio_id: req.session.user_id }
    });
    const portfolioCoin = portfolioCoinData.map((portcoin) => portcoin.get({ plain: true }))
    
    let quantities = [];
    portfolioCoin.forEach(coin => quantities.push(coin.quantity));
    // console.log(quantities);



    const portfolio = portfolioData.map((portfolio) => portfolio.get({ plain: true }));
    let portCoins = [];
    portfolio[0].coins.forEach(coin => portCoins.push(coin.coin_name));

    // console.log(portfolio[0].portfolio_coin[0]);

    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${portCoins.join('%2C')}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true`)
    const data = await response.json();
    const dataArr = Object.entries(data)
    const coinArr = dataArr.map(coin => coin[0])
    // console.log(coinArr);

    const coinsArray = [];

    for (const coin in coins) {
      coinsArray.push([coins[coin].coin_name, coins[coin].price]);
    }

    let prices = [];
    dataArr.forEach(coin => prices.push(coin[1].usd))
    console.log(prices);
    console.log(quantities);

    res.render('dashboard', {
      ...portfolio[0], 
      coinsArray, 
      coinArr, 
      dataArr, //resGPT,
      quantities,
      prices,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('landing');
});

module.exports = router;