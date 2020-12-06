const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router')
const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})
app.use(router)
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

module.exports = io