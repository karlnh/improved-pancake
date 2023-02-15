document.addEventListener('DOMContentLoaded', () => {
    const loginInfo = require('./login');
    const socket = io();

    let username
    let connected = false;

    const setUsername = () => {
        username = loginInfo.loginFormHandler;
        if (username) {
            socket.emit('add user', username);
        };
    };

    // Socket events
    socket.on('login', (data) => {
        connected = true;
        console.log(connected);
    });

    socket.on('disconnect', () => {
        console.log("You have been disconnected.");
    });

    socket.io.on('reconnect_error', () => {
        console.log('Reconnect attempt failed.');
    });
});