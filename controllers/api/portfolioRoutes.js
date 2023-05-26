const router = require('express').Router();
const { Portfolio } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new portfolio entry
router.post('/', withAuth, async (req, res) => {
    try {
        const newPortfolio = await Portfolio.create({
            ...req.body,
            user_id: req.session.userId,
        });

        res.status(200).json(newPortfolio);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;