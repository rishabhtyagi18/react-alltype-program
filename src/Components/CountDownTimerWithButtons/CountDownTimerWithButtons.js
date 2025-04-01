import React, { useState, useEffect } from 'react';

const CountDownTimerWithButtons = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    if (time > 0) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setInputValue('');
  };

  const handleSetTimer = () => {
    const seconds = parseInt(inputValue, 10);
    if (!isNaN(seconds) && seconds > 0) {
      setTime(seconds);
      setInputValue('');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Countdown Timer</h1>
      <div style={{ fontSize: '48px' }}>
        {time > 0 ? time : 'Time\'s up!'}
      </div>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Set timer in seconds"
        />
        <button onClick={handleSetTimer}>Set Timer</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleStart} disabled={isActive || time === 0}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isActive}>
          Pause
        </button>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountDownTimerWithButtons;