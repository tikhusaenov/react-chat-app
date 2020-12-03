import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import Feedback from "../Feedback/Feedback";
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import RepliedMessage from "../RepliedMessage/RepliedMessage";
import './Chat.css';



const ENDPOINT = 'http://localhost:5000';

let socket;


const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [myTyping, setMyTyping] = useState(false)
    const [typingUser, setTypingUser] = useState('')
    const [repliedMessage, setRepliedMessage] = useState('')




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
            setMyTyping(false)
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
        socket.on('myTyping',({user}) => {
            if (!myTyping) {
                setMyTyping(true)
                setTypingUser(user)
                console.log(`${user} typing is received`)

            }

        })


    }, []);




    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            });
        }

    }

    const sendTyping = (status) => {
        if(status) {
            setMyTyping(status)

            socket.emit('typing', name)
            setMyTyping(false)
        }
    }

    const replyMessage = (event, {text,user}) => {
        event.preventDefault();
        setRepliedMessage(text)
        console.log(text, user)
    }





    return (
        <div className="mainContainer">
            <div className="header">
                <div className="chatHeaderLeftInnerContainer">
                    <h2>Chat app</h2>
                </div>
                <div className="chatHeaderRightInnerContainer">
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="12" height="12" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    </a>
                </div>
            </div>
            <div className="outerContainer">
                <TextContainer users={users}/>
                <div className="container">
                    <InfoBar/>
                    <Messages messages={messages} name={name} replyMessage={replyMessage} repliedMessage={repliedMessage}/>
                    <Feedback myTyping={myTyping} typingUser={typingUser}/>
                    <RepliedMessage repliedMessage={repliedMessage}/>
                    <Input sendTyping={sendTyping} message={message} sendMessage={sendMessage} setMessage={setMessage}/>
                </div>
            </div>
        </div>
    );
}

export default Chat;
