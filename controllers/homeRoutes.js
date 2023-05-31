const router = require('express').Router();
const {User, Portfolio, Coin} = require('../models');

router.get('/', async (req, res) => {
  try {

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
      ...portfolio[0],
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

module.exports = router;