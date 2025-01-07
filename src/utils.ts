import { BoardState, Player } from './types';
import { ROWS, COLS } from './constants';

export const createEmptyBoard = (): BoardState =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

export const findLowestEmptyRow = (board: BoardState, col: number): number => {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return -1;
};

export const checkWinner = (
  board: BoardState,
  row: number,
  col: number,
  player: Player
): boolean => {
  // Vérification horizontale
  for (let c = 0; c <= COLS - 4; c++) {
    if (
      board[row][c] === player &&
      board[row][c + 1] === player &&
      board[row][c + 2] === player &&
      board[row][c + 3] === player
    ) {
      return true;
    }
  }

  // Vérification verticale
  for (let r = 0; r <= ROWS - 4; r++) {
    if (
      board[r][col] === player &&
      board[r + 1][col] === player &&
      board[r + 2][col] === player &&
      board[r + 3][col] === player
    ) {
      return true;
    }
  }

  // Vérification diagonale (montante)
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[r][c] === player &&
        board[r - 1][c + 1] === player &&
        board[r - 2][c + 2] === player &&
        board[r - 3][c + 3] === player
      ) {
        return true;
      }
    }
  }

  // Vérification diagonale (descendante)
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        board[r][c] === player &&
        board[r + 1][c + 1] === player &&
        board[r + 2][c + 2] === player &&
        board[r + 3][c + 3] === player
      ) {
        return true;
      }
    }
  }

  return false;
};