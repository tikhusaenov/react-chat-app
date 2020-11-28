const users = []

const addUser = ({ id, name}) => {
    name = name.trim().toLowerCase()

    const existingUser = users.find((user) => user.name === name);

    if(!name) return { error: 'Username is required.' };
    if(existingUser) return { error: 'Username is taken.' };

    const user = { id, name };

    users.push(user);

    return { user };

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = () => users.filter((user) => user);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };