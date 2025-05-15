import React, { useState } from "react";

export default function NQueens() {
  const [size, setSize] = useState(4);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if a queen can be placed at board[row][col]
  function isSafe(board, row, col) {
    // Check left side of current row
    for (let i = 0; i < col; i++) {
      if (board[row][i] === 1) return false;
    }

    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }

    // Check lower diagonal on left side
    for (let i = row, j = col; i < size && j >= 0; i++, j--) {
      if (board[i][j] === 1) return false;
    }

    return true;
  }

  // Backtracking utility to solve N-Queens
  function solveNQueensUtil(board, col, sols) {
    if (col === size) {
      // Save a deep copy of the board
      sols.push(board.map((row) => row.map((cell) => cell)));
      return;
    }

    for (let i = 0; i < size; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = 1;
        solveNQueensUtil(board, col + 1, sols);
        board[i][col] = 0; // backtrack
      }
    }
  }

  function solve() {
    setLoading(true);
    setSolutions([]);
    const board = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));
    const sols = [];
    setTimeout(() => {
      solveNQueensUtil(board, 0, sols);
      setSolutions(sols);
      setLoading(false);
    }, 50);
  }

  // Render single board solution
  function renderBoard(board, index) {
    return (
      <div key={index} style={{ marginBottom: 30 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${size}, 40px)`,
            gap: 4,
            justifyContent: "start",
          }}
        >
          {board.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor:
                    (rowIndex + colIndex) % 2 === 0 ? "#f0d9b5" : "#b58863",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                }}
                aria-label={cell === 1 ? "Queen" : "Empty"}
              >
                {cell === 1 ? "♛" : ""}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 820,
        margin: "40px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      <h1>N-Queens Solver</h1>
      <div style={{ marginBottom: 20 }}>
        <label>
          Board Size (N):
          <input
            type="number"
            min={4}
            max={15}
            value={size}
            onChange={(e) => setSize(Math.min(15, Math.max(4, +e.target.value)))}
            style={{
              marginLeft: 12,
              width: 60,
              padding: 6,
              fontSize: 16,
              textAlign: "center",
            }}
            aria-label="Board size input"
          />
        </label>
        <button
          onClick={solve}
          style={{
            marginLeft: 20,
            padding: "8px 20px",
            fontSize: 16,
            fontWeight: "600",
            cursor: "pointer",
            backgroundColor: "#0078d7",
            border: "none",
            borderRadius: 6,
            color: "white",
          }}
          aria-label="Solve N-Queens button"
        >
          Solve
        </button>
      </div>

      {loading && <p>Solving...</p>}

      {!loading && solutions.length > 0 && (
        <div>
          <p>
            Found {solutions.length} solution{solutions.length > 1 ? "s" : ""} for
            {` ${size}-Queens`}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 20,
              marginTop: 20,
            }}
          >
            {solutions.map((solution, i) => renderBoard(solution, i))}
          </div>
        </div>
      )}

      {!loading && solutions.length === 0 && (
        <p>No solutions found. Try a board size of 4 or greater.</p>
      )}
    </div>
  );
}
