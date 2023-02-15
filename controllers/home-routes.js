const router = require('express').Router();
const clog = require('clog');

const express = require('express');
const app = express();



router.get('/', async (req, res) => {
    clog.info("Accessing home...");
    try {
        // if logged in, go to chat
        if (req.session.loggedIn) {
            clog.info("Logged in. Redirecting to chat...");
            res
                .redirect('http://localhost:3000/')
                .render('chat');
            // necessary to redirect to a different port because 3001 is where our normal server is running; socket.io won't run if the port is already in use by the normal server.
            return;
        };
        // if not, go login
        clog.info("Not logged in. Redirecting to login...");
        res.status(200)
        .redirect('/login');

    } catch (err) {
        clog.debug(err);
        clog.warn("Could not access home.");
        res.status(500)
        .json(err);
    }
});

// router.get('http://localhost:3000/', async (req, res) => {
//     clog.info(`Accessing chat...`);
//     res.render('chat');
// });

router.get('/login', (req, res) => {
    clog.info(`Accessing login...`);
    res.render('login');
});

module.exports = router;