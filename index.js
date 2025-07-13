const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');

const io = new Server(server);

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('on-chat', data => {
        console.log(data);
        io.emit('user-chat', data);
    })
})

server.listen(port, () => {
    console.log("app running at http://localhost:" + port);
})