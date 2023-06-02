const router = require('express').Router();
const {User, Portfolio, Coin} = require('../models');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get('/', async (req, res) => {
  try {
    
    let coins = ['bitcoin', 'ethereum'];
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `My cryptocurrency portfolio holds ${coins}. As of the year 2023, give me predictions for the coins in my portfolio and recent news for each coin. Finally, suggest one cryptocurrency that is worth researching more about.`,
        temperature: 1.2,
        max_tokens: 2048,
        // top_p: 1.0,
        n: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\"\"\""],
      });
      const resGPT = response.data.choices[0].text;

    const portfolioData = await Portfolio.findAll({
      where: { user_id: req.session.user_id },
        include: [
        { model: User, attributes: ['user_name'] },
        { model: Coin }
      ],
    });

    const portfolio = portfolioData.map((portfolio) => portfolio.get({ plain: true }));
    console.log(portfolio);

    res.render('homepage', {
      ...portfolio[0], resGPT,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for login page
router.get('/login', (req, res) => {
    // if (req.session.logged_in) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('login');
});

// async function getGPT(...coins){
//   const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: `My cryptocurrency portfolio holds ${coins}. As of the year 2023, give me predictions for the coins in my portfolio and recent news for each coin. Finally, suggest one cryptocurrency that is worth researching more about.`,
//   temperature: 1.2,
//   max_tokens: 2048,
//   // top_p: 1.0,
//   n: 1,
//   frequency_penalty: 0.0,
//   presence_penalty: 0.0,
//   stop: ["\"\"\""],
// });
// // const data = await response.json();
// let resGPT = response.data.choices[0].text;
// console.log(resGPT);
// return resGPT;
// }

module.exports = router;