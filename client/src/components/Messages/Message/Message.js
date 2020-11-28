import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user}, name, replyMessage}) => {
    let isSentByCurrentUser = false;


    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }


    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">

                    <p className="sentText pr-10">{trimmedName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>


                    </div>
                    {/*<button className="replyButton" onClick={e => replyMessage(e)}>*/}
                    {/*    reply*/}
                    {/*</button>*/}
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    {/*<button className="replyButton" onClick={e => replyMessage(e)}>*/}
                    {/*    reply*/}
                    {/*</button>*/}
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>

                    </div>
                    <p className="sentText pl-10 ">{user}</p>

                </div>
            )
    );
}

export default Message;