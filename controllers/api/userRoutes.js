const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const bcrypt = require('bcryptjs');

// POST /api/users/signup
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    try {
        // Try to find the user with the given email address
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Use bcrypt to compare the provided password with the stored hashed password
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // If the email and password are valid, create a new session
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// // PUT /api/users/:id (for updating user details)
// router.put('/:id', withAuth, async (req, res) => {
//     // User update logic here
// });

module.exports = router;