// Express
const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const app = express();
// Routes
const routes = require('./controllers');
// Sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Misc
const path = require('path');
const PORT = process.env.PORT || 3001;
const clog = require('clog');

const http = require('http').Server(app);
const io = require('socket.io')(http);

// const server = require('http').createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// Sequelize session
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    },
    resave: false,
    saveUninitialized: true, // for remembering returning visitors
    store: new SequelizeStore({
        db: sequelize,
    }),
};

if (!sess) {
    clog.error("Session could not be created.");
} else {
    app.use(session(sess));
    clog.info("Session created.");
};

// Handlebars setup
const hbs = expressHandlebars.create();

if (!hbs) {
    clog.error("Template engine could not be created.");
} else {
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    clog.info("Template engine created.");
};

// Express initialization
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// Socket.io
io.on('connection', (socket) => {
    clog.info(`Connecting into ${socket}.`);
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});


sequelize.sync({force: false}) // UNDO THIS LATER
.then(() => {
    app.listen(PORT, () => {
        clog.info(`Now listening on ${PORT}!`);
    });

    http.listen(3000, () => {
        clog.info(`Testing at 3000`);
    });
});