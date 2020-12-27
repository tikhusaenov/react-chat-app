import React from 'react'
import './Feedback.scss'

const Feedback = ({ myTyping, typingUser}) => {

    return (
        myTyping
            ? (
                <p className="userIsTyping">
                    {typingUser} is typing...
                </p>
            )
            : null


    )
}

export default Feedback