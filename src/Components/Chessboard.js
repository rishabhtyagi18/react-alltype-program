import React, { useState } from "react";

const Chessboard = ({ size }) => {
    const renderSquare = (row, col) => {
        const isBlack = (row + col) %2 === 1;
        return (
            <div 
                key={`${row}-${col}`}
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: isBlack ? 'black' : 'white',
                  }}
            />
        )
    }

    const row = Array.from({ length: size}, (_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
            {Array.from({ length: size }, (_, colIndex) => renderSquare(rowIndex, colIndex))}
        </div>
    ))

    return (
        <div style={{ border: '1px solid', width: 'fit-content', margin: '0 auto' }}>{row}</div>
    )
}

export default Chessboard;