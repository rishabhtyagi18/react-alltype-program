// withTimer.js
import React, { useEffect, useState } from 'react';

const withTimerHOC = (WrappedComponent) => {
    return (props) => {
        const [seconds, setSeconds] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(interval); // Cleanup on unmount
        }, []);

        return <WrappedComponent seconds={seconds} {...props} />;
    };
};

export default withTimerHOC;