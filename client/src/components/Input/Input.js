import React from 'react';

import './Input.scss';

const Input = ({
                   messageWithRepliedMessage,
                   setMessageWithRepliedMessage,
                   repliedMessage,
                   setMessage,
                   sendMessage,
                   message,
                   sendTyping,
                   valueToEdit,
                   editMessage
                }) =>
{


    return (

        <form className="formInput">

            <input
                className="messageInput"
                type="text"
                placeholder="Write a message..."
                value={valueToEdit ? (
                    valueToEdit
                )
                    : message}

                onChange={({target: {value}}) => {
                    setMessage(value)
                    if(value) {
                        sendTyping(true)
                        if (repliedMessage) {
                            setMessageWithRepliedMessage(true)
                        }

                    } else {
                        sendTyping(false)

                    }

                }}
                onKeyPress={event => {
                    if (event.key === 'Enter') {

                        if (messageWithRepliedMessage) {
                            sendMessage(event, repliedMessage)
                        }
                        else if (valueToEdit) {
                            editMessage(event, valueToEdit)
                        }
                        else {
                            sendMessage(event)
                        }

                   } else return null
                }}
            />

                <button className="sendButton" onClick={e => sendMessage(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#B0B0B0" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z"/>
                    </svg>
                </button>

        </form>
    )

}

export default Input;