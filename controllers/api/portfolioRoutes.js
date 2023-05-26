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

// Update a portfolio entry
router.put('/:id', withAuth, async (req, res) => {
    try {
        const portfolioData = await Portfolio.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.userId,
            },
        });

        if (!portfolioData[0]) {
            res.status(404).json({ message: 'No portfolio entry found with this id' });
            return;
        }

        res.status(200).json(portfolioData);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;