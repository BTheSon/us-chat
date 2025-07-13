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
    
    // Lắng nghe sự kiện user-join từ client
    socket.on('user-join', (data) => {
        console.log(`${data.username} đã tham gia!`);
        // Phát thông báo đến tất cả client
        io.emit('user-chat', { username: data.username, message: `đã tham gia !` });
    });

    socket.on('on-chat', data => {
        console.log(data);
        io.emit('user-chat', data);
    })
})

server.listen(port, () => {
    console.log("app running at http://localhost:" + port);
})