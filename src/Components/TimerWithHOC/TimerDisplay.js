// TimerDisplay.js
import React from 'react';

const TimerDisplay = ({ seconds }) => {
    return (
        <div>
            <h1>Timer: {seconds} seconds</h1>
        </div>
    );
};

export default TimerDisplay;