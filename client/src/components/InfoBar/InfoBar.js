import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png'


import './InfoBar.css';

const InfoBar = () => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online image"/>
            <h3>Room</h3>
        </div>

    </div>
);

export default InfoBar;