const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

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
        const { error, user } = addUser({ id: socket.id, name})

        if (error) return callback(error)

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the chat room!`})
        socket.broadcast.emit('message', {user: 'admin', text: `${user.name} has joined!`})
        io.emit('roomData', {  users: getUsersInRoom() });
        callback()
    })

    socket.on('sendMessage', (message, repliedMessage, callback) => {
        const user = getUser(socket.id)
        hour = new Date().getHours();
        minutes = new Date().getMinutes();
        console.log(user)
        console.log(repliedMessage)
        if (user) {
            io.emit('message', { user: user.name, text: message, replied: repliedMessage, time: `${hour}:${minutes}` })
        }

        callback()
    })





    socket.on('typing', () => {
        const user = getUser(socket.id)
        socket.broadcast.emit('myTyping', {user: user.name})


    })

    socket.on('disconnect', () => {
        console.log('User had left!!!')
        const user = removeUser(socket.id);
        if(user) {
            io.emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.emit('roomData', { users: getUsersInRoom()});
        }
    })
})

app.use(router)

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));