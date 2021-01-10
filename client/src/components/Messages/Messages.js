import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.scss';




const Messages = ({ messages, name, replyMessage, valueToEdit, repliedMessage,setValueToEdit,  addMessageToInput, setEdittedMessage, edittedMessage}) => (
    <ScrollToBottom className="messages">
        {
            messages.map((message, i) =>
                <div key={i}>

                    <Message message={message}
                             name={name}
                             valueToEdit={valueToEdit}
                             replyMessage={replyMessage}
                             repliedMessage={repliedMessage}
                             addMessageToInput={addMessageToInput}
                             edittedMessage={edittedMessage}
                             setValueToEdit={setValueToEdit}
                             setEdittedMessage={setEdittedMessage}
                    />
                </div>

            )

        }


    </ScrollToBottom>

);

export default Messages;