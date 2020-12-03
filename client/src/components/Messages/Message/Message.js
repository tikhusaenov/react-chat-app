import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user}, name, replyMessage, repliedMessage}) => {
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

                    <button className="replyButton" onClick={e => {
                        repliedMessage = {text, user}
                        replyMessage(e,repliedMessage)

                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z"/></svg>
                    </button>
                    {/*<button className="replyButton" onClick={e => replyMessage(e)}>*/}
                    {/*    reply*/}
                    {/*</button>*/}
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <button className="replyButton" onClick={e => {
                        repliedMessage = {text, user}
                        replyMessage(e,repliedMessage)

                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z"/></svg>
                    </button>
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>

                    </div>
                    <p className="sentText pl-10 ">{user}</p>

                </div>
            )
    );
}

export default Message;