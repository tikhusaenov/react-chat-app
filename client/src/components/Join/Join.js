import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.scss';

export default function SignIn() {
    const [name, setName] = useState('');


    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join the chat</h1>
                <div>
                    <input placeholder="Type your name..."
                           className="joinInput"
                           type="text"
                           onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/chat?name=${name}`}>
                    <button className='buttonSubmit mt-20' type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
}
