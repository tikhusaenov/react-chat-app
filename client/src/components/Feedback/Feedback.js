import React from 'react'


const Feedback = ({ myTyping, name}) => {

    return (
        myTyping
            ? (
                <div>
                    <p>
                        {name} is typing...
                    </p>
                </div>
            )
            : null


    )
}

export default Feedback