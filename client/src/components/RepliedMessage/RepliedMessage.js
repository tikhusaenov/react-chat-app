import React from 'react'
import './RepliedMessage.scss'

const RepliedMessage = ({repliedMessage, setRepliedMessage}) => {

    return (
        repliedMessage
        ? (
                <div className="repliedMessage">
                    <p>{repliedMessage}</p>
                    <button className="removeRepliedMessage" onClick={() => setRepliedMessage(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    </button>
                </div>
            ) : null

    )
}


export default RepliedMessage