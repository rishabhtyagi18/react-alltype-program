// CountdownTimer.js
import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ startSeconds }) => {
    const [seconds, setSeconds] = useState(startSeconds);

    useEffect(() => {
        if (seconds > 0) {
            const interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [seconds]);

    return (
        <div>
            <h1>Countdown: {seconds} seconds</h1>
        </div>
    );
};

export default CountdownTimer;