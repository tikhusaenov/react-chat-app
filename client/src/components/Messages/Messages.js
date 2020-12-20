import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';




const Messages = ({ messages, name, replyMessage, repliedMessage,messageWithRepliedMessage}) => (
    <ScrollToBottom className="messages">
        {
            messages.map((message, i) =>
                <div key={i}>

                    <Message message={message}
                             name={name}
                             replyMessage={replyMessage}
                             repliedMessage={repliedMessage}
                             messageWithRepliedMessage={messageWithRepliedMessage}
                    />
                </div>

            )

        }


    </ScrollToBottom>

);

export default Messages;