import React from 'react';

import './Message.scss';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, replied, time, edit},
                     name,
                     replyMessage,
                     repliedMessage,
                     addMessageToInput,
                     edittedMessage,
                     setValueToEdit,
                     setEdittedMessage,
                     valueToEdit}) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }
    // console.log(text, edit)



    return (

        isSentByCurrentUser
            ? (

                <div className="messageContainer justifyEnd">

                    <p className="sentText pr-10">You</p>

                    <div className="messageBox backgroundBlue">

                        <div className={replied ? "repliedMessageBlock" : null}>
                            {replied}
                        </div>

                        <p className="messageText colorWhite">{(edit && valueToEdit) ? (

                            ReactEmoji.emojify(valueToEdit)

                        ) : ReactEmoji.emojify(text)}</p>
                        <div className="timeOfMessage">
                            {time}
                        </div>
                    </div>

                    <button className="editMessage" onClick={e => {
                            setValueToEdit(text)
                            addMessageToInput(e, valueToEdit)
                            setEdittedMessage(true)
                    }}>
                        edit
                    </button>

                    <button className="replyButton" onClick={e => {
                        repliedMessage = {text, user}
                        console.log(repliedMessage)
                        replyMessage(e,repliedMessage)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z"/></svg>
                    </button>

                </div>
            )
            : (
                <div className="messageContainer justifyStart">


                    <button className="replyButton" onClick={e => {
                        repliedMessage = {text, user}
                        console.log(repliedMessage)
                        replyMessage(e,repliedMessage)

                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z"/></svg>
                    </button>
                    <div className="messageBox backgroundLight">
                        <div className={replied ? "repliedMessageBlock other" : null}>{replied}</div>
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                        <div className="timeOfMessage colorDark">
                            {time}
                        </div>

                    </div>

                    <p className="sentText pl-10 ">{user}</p>

                </div>
            )
    );
}

export default Message;