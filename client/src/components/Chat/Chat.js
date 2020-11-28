import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';



const ENDPOINT = 'http://localhost:5000';

let socket;


const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [feedback, setFeedback] = useState('')



    useEffect(() => {
        const { name } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name)

        socket.emit('join', { name}, (error) => {
            if(error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

        // socket.on('typing', feedback => {
        //     setFeedback(feedback)
        // })

    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message,messages)



    return (
        <div className="mainContainer">
            <div className="header">
                <div className="headerLeftInnerContainer">
                    <h2>Chat app</h2>
                </div>
                <div className="headerRightInnerContainer">
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="12" height="12" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    </a>
                </div>
            </div>
            <div className="outerContainer">
                <TextContainer users={users}/>
                <div className="container">
                    <InfoBar/>
                    <Messages messages={messages} name={name}/>
                    <Input message={message} sendMessage={sendMessage} setMessage={setMessage}/>
                </div>

            </div>
        </div>
    );
}

export default Chat;