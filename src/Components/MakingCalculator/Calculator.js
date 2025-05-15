import React, { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewInput, setWaitingForNewInput] = useState(false);

  // Helper to safely parse display to number
  const parseDisplay = () => parseFloat(display);

  // Handle number or decimal input
  const inputDigit = (digit) => {
    if (waitingForNewInput) {
      setDisplay(digit === "." ? "0." : digit);
      setWaitingForNewInput(false);
    } else {
      // Avoid multiple decimals
      if (digit === "." && display.includes(".")) return;
      setDisplay(display === "0" && digit !== "." ? digit : display + digit);
    }
  };

  // Handle operator input
  const inputOperator = (nextOperator) => {
    const inputValue = parseDisplay();

    if (previous === null) {
      setPrevious(inputValue);
    } else if (operator) {
      const currentValue = previous || 0;
      const result = calculate(currentValue, inputValue, operator);
      setPrevious(result);
      setDisplay(String(result));
    }

    setWaitingForNewInput(true);
    setOperator(nextOperator);
  };

  // Perform the calculation
  const calculate = (prev, current, op) => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        if (current === 0) {
          alert("Error: Division by zero");
          return 0;
        }
        return prev / current;
      default:
        return current;
    }
  };

  // Handle equals button
  const handleEqual = () => {
    const inputValue = parseDisplay();
    if (operator && !waitingForNewInput) {
      const result = calculate(previous, inputValue, operator);
      setDisplay(String(result));
      setPrevious(null);
      setOperator(null);
      setWaitingForNewInput(true);
    }
  };

  // Clear all
  const clearAll = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setWaitingForNewInput(false);
  };

  return (
    <div style={{
      background: '#1e2127',
      width: '320px',
      borderRadius: '15px',
      boxShadow: '0 8px 15px rgba(0,0,0,0.6)',
      padding: '20px',
      color: 'white',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none'
    }}>
      <div style={{
        background: '#3c4048',
        fontSize: '2.5rem',
        padding: '15px 20px',
        borderRadius: '10px',
        textAlign: 'right',
        marginBottom: '20px',
        overflowX: 'auto',
        minHeight: '60px'
      }}>
        {display}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '15px'
      }}>
        <button onClick={clearAll} style={buttonStyle('#d32f2f')}>C</button>
        <OperatorButton operator="/" onClick={inputOperator} />
        <OperatorButton operator="*" onClick={inputOperator} />
        <OperatorButton operator="-" onClick={inputOperator} />

        <DigitButton digit="7" onClick={inputDigit} />
        <DigitButton digit="8" onClick={inputDigit} />
        <DigitButton digit="9" onClick={inputDigit} />
        <OperatorButton operator="+" onClick={inputOperator} />

        <DigitButton digit="4" onClick={inputDigit} />
        <DigitButton digit="5" onClick={inputDigit} />
        <DigitButton digit="6" onClick={inputDigit} />
        <button onClick={handleEqual} 
                style={{...buttonStyle('#4caf50'), gridColumn: 'span 1'}}
                aria-label="equals">=</button>

        <DigitButton digit="1" onClick={inputDigit} />
        <DigitButton digit="2" onClick={inputDigit} />
        <DigitButton digit="3" onClick={inputDigit} />

        <DigitButton digit="0" onClick={inputDigit} style={{gridColumn: 'span 2'}} />
        <DigitButton digit="." onClick={inputDigit} />
      </div>
    </div>
  );
}

// Button style helper
const buttonStyle = (bgColor) => ({
  padding: '20px',
  fontSize: '1.25rem',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  background: bgColor,
  color: '#fff',
  boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.2)',
  userSelect: 'none',
  transition: 'background 0.25s, color 0.25s',
});

// Button for digits
function DigitButton({digit, onClick, style}) {
  return (
    <button 
      onClick={() => onClick(digit)} 
      style={{...buttonStyle('#2f343d'), ...(style || {})}}
      aria-label={`Digit ${digit}`}>
      {digit}
    </button>
  );
}

// Button for operators
function OperatorButton({operator, onClick}) {
  const symbols = { '/': '÷', '*': '×', '-': '−', '+': '+' };
  return (
    <button 
      onClick={() => onClick(operator)} 
      style={buttonStyle('#f57c00')}
      aria-label={`Operator ${symbols[operator]}`}>
      {symbols[operator]}
    </button>
  );
}
