const io = require('./index')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

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

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        console.log(user)
        if (user) {
            io.emit('message', { user: user.name, text: message})
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
