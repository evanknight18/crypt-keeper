const router = require('express').Router();

// Import routes
const userRoutes = require('./userRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const cryptoRoutes = require('./cryptoRoutes');

// Set up routes
router.use('/users', userRoutes);
router.use('/portfolio', portfolioRoutes);
// router.use('/crypto', cryptoRoutes);

module.exports = router;
