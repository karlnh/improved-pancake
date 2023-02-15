const router = require('express').Router();
const { User } = require('../../models');
const clog = require('clog');

// CREATE new user
router.post('/', async (req, res) => {
    clog.info("Posting new User...");
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            //respond with userdata
            res.status(200).json(dbUserData);
        });
        clog.info("Successfully created new User.");

    } catch (err) {
        clog.debug(err);
        clog.warn("Could not post new User.");
        res.status(500).json(err);
    }
});

// LOGIN user
router.post('/login', async (req, res) => {
    clog.info("Attempting login post...");
    try {
        // find a username in the database
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        
        // if no user data in database
        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password.'});
            clog.warn("No user in the database.");
            return;
        };

        // find a password in the database
        const validPassword = await dbUserData.checkPassword(req.body.password);

        // if no valid password can be found
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password.'});
            clog.warn("No password in the database.");
            return;
        };

        // if username and password valid, log in
        req.session.save(() => {
            req.session.loggedIn = true;
            console.log(req.session.cookie);

            res
            .status(200)
            .json({ user: dbUserData, message: 'Successfully logged in.'});
            clog.info("Successfully logged in.");
        });
    } catch (err) {
        clog.debug(err);
        clog.warn("Could not log in.");
        res.status(500).json(err);
    };
});

// LOGOUT user
router.post('/logout', (req, res) => {
    clog.info(`Attempting logout post...`);
    if (req.session.loggedIn) {
        clog.info("Logged in; logging out...");
        req.session.destroy(() => {
            clog.info("Logged out.");
            res.status(204).end();
        });
    } else {
        clog.warn("Could not log out.");
        res.status(404).end();
    };
});

module.exports = router;