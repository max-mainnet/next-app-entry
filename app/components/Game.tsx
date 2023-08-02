"use client";  // This is a client component
import { useState } from "react";

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (index) => {
        const newBoard = [...board];
        if (calculateWinner(board) || newBoard[index]) {
            return;
        }
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (index) => {
        return (
            <button key={index} className="square" onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    const winner = calculateWinner(board);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <div className="game">
            <div className="status">{status}</div>
            <div className="board">
                {[0, 1, 2].map((row) => (
                    <div key={row} className="row">
                        {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default Game;
