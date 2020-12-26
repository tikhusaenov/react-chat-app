const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express()
const server = http.createServer(app)
const { cors } = require('./utils/cors')
const io = socketio(server, cors)
const router = require('./router/router')
const { joinRoom, sendMessage, typingMessage, disconnection } = require('./utils/messages')


io.on('connection', socket => {
    console.log('We have a new connection!!!')
    joinRoom(socket, io)
    sendMessage(socket, io)
    typingMessage(socket)
    disconnection(socket, io)
})

app.use(router)

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

