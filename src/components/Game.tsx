import React, { useState, useCallback } from 'react';
import Board from './Board';
import { BoardState, Player } from '../types';
import { checkWinner, createEmptyBoard, findLowestEmptyRow } from '../utils';

const Game: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const checkDraw = useCallback((boardState: BoardState): boolean => {
    return boardState[0].every(cell => cell !== null);
  }, []);

  const handleCellClick = (col: number) => {
    if (winner || isDraw) return;

    const row = findLowestEmptyRow(board, col);
    if (row === -1) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer;

    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setBoard(newBoard);
      setWinner(currentPlayer);
      return;
    }

    if (checkDraw(newBoard)) {
      setBoard(newBoard);
      setIsDraw(true);
      return;
    }

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(1);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Puissance 4</h1>
          {!winner && !isDraw && (
            <p className="text-xl text-gray-600">
              Au tour du Joueur {currentPlayer} {currentPlayer === 1 ? '🔴' : '🟡'}
            </p>
          )}
          {winner && (
            <p className="text-xl font-bold text-green-600">
              Joueur {winner} gagne! 🎉
            </p>
          )}
          {isDraw && (
            <p className="text-xl font-bold text-blue-600">
              Match nul! 🤝
            </p>
          )}
        </div>

        <Board
          board={board}
          currentPlayer={currentPlayer}
          onCellClick={handleCellClick}
          disabled={!!winner || isDraw}
        />

        <button
          onClick={resetGame}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition-colors mx-auto block"
        >
          Nouvelle partie
        </button>
      </div>
    </div>
  );
};

export default Game;