const router = require('express').Router();

// Import routes
const userRoutes = require('./userRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const coinRoutes = require('./coinRoutes');

// Set up routes
router.use('/users', userRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/coin', coinRoutes);

module.exports = router;
