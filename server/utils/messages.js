const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const moment = require('moment')

const joinRoom = (socket, io) => {
    socket.on('join', ({ name }, callback) => {

        const { error, user } = addUser({ id: socket.id, name})

        if (error) return callback(error)

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the chat room!`})
        socket.broadcast.emit('message', {user: 'admin', text: `${user.name} has joined!`})
        io.emit('roomData', {  users: getUsersInRoom() });
        callback()
    })
}

const sendMessage = (socket, io) => {
    socket.on('sendMessage', (message, repliedMessage, callback) => {
        const user = getUser(socket.id)
        if (user) {
            io.emit('message', {
                user: user.name,
                text: message,
                replied: repliedMessage,
                time: moment().format('h:mm a'),
            })
        }

        callback()
    })
}

const typingMessage = socket => {
    socket.on('typing', () => {
        const user = getUser(socket.id)
        socket.broadcast.emit('myTyping', {user: user.name})

    })
}

const disconnection = (socket, io) => {
    socket.on('disconnect', () => {
        console.log('User had left!!!')
        const user = removeUser(socket.id);
        if(user) {
            io.emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.emit('roomData', { users: getUsersInRoom()});
        }
    })
}


module.exports = { joinRoom, sendMessage, typingMessage, disconnection };