import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'


const ENDPOINT = 'http://localhost:5000';
let socket;
const Chat = ({ location }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        const { name } = queryString.parse(location.search);
        socket = io(ENDPOINT);

        setName(name)


        socket.emit('join', { name }, () => {
            alert(`Welcome to the chat, ${ name }`)
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }



    }, [ENDPOINT, location.search])
    return (
        <h1>Chat</h1>
    )
}

export default Chat