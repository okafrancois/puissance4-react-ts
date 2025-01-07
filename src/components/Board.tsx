import React from 'react';
import Cell from './Cell';
import { COLS, ROWS } from '../constants';
import { BoardState, Player } from '../types';

interface BoardProps {
  board: BoardState;
  currentPlayer: Player;
  onCellClick: (col: number) => void;
  disabled: boolean;
}

const Board: React.FC<BoardProps> = ({ board, currentPlayer, onCellClick, disabled }) => {
  return (
    <div className="grid gap-2 p-4 bg-blue-800 rounded-lg shadow-lg">
      {Array.from({ length: ROWS }, (_, row) => (
        <div key={row} className="flex gap-2 justify-center">
          {Array.from({ length: COLS }, (_, col) => (
            <Cell
              key={`${row}-${col}`}
              value={board[row][col]}
              onClick={() => onCellClick(col)}
              isClickable={!disabled && board[0][col] === null}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;