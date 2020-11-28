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

io.on('connection', socket => {
    console.log('We have a new connection!!!')

    socket.on('join', ({ name }, callback) => {
        console.log(name)


    })

    socket.on('disconnect', () => {
        console.log('User had left!!!')
    })
})

app.use(router)

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));