import { useState, useCallback } from 'react';
import { Board, GameSettings, GameState, Player } from '../../types/types';
import { createEmptyBoard } from '../../utils/createEmptyBoard/createEmptyBoard';

const defaultSettings: GameSettings = {
  rows: 6,
  columns: 7,
  winningLength: 4
};

export function useConnectFour(settings: GameSettings = defaultSettings) {
  const [board, setBoard] = useState<Board>(createEmptyBoard(settings.rows, settings.columns));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('kitten');
  const [gameState, setGameState] = useState<GameState>('playing');

  const checkWin = useCallback((board: Board, row: number, col: number): boolean => {
    const directions = [
      [0, 1],  // horizontal
      [1, 0],  // vertical
      [1, 1],  // diagonal down-right
      [1, -1]  // diagonal down-left
    ];
  
    return directions.some(([dy, dx]) => {
      let count = 1;
  
      // Check in positive direction (right, down, diagonal down-right/left)
      for (let i = 1; i < settings.winningLength; i++) {
        const newRow = row + i * dy;
        const newCol = col + i * dx;
        if (newRow >= 0 && newRow < settings.rows && newCol >= 0 && newCol < settings.columns) {
          if (board[newRow][newCol] === currentPlayer) {
            count++;
          } else {
            break;
          }
        }
      }
  
      // Check in negative direction (left, up, diagonal up-left/right)
      for (let i = 1; i < settings.winningLength; i++) {
        const newRow = row - i * dy;
        const newCol = col - i * dx;
        if (newRow >= 0 && newRow < settings.rows && newCol >= 0 && newCol < settings.columns) {
          if (board[newRow][newCol] === currentPlayer) {
            count++;
          } else {
            break;
          }
        }
      }
  
      return count >= settings.winningLength;
    });
  }, [currentPlayer, settings.winningLength, settings.rows, settings.columns]);
  

  const checkDraw = useCallback((board: Board): boolean => {
    return board[0].every(cell => cell !== null);
  }, []);

  const placePiece = useCallback((column: number): boolean => {
    if (gameState !== 'playing') return false;

    const newBoard = board.map(row => [...row]);
    for (let row = settings.rows - 1; row >= 0; row--) {
      if (newBoard[row][column] === null) {
        newBoard[row][column] = currentPlayer;
        setBoard(newBoard);
        
        if (checkWin(newBoard, row, column)) {
          setGameState('won');
        } else if (checkDraw(newBoard)) {
          setGameState('draw');
        } else {
          setCurrentPlayer(currentPlayer === 'kitten' ? 'puppy' : 'kitten');
        }
        
        return true;
      }
    }
    return false;
  }, [board, currentPlayer, gameState, settings.rows, checkWin, checkDraw]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard(settings.rows, settings.columns));
    setCurrentPlayer('kitten');
    setGameState('playing');
  }, [settings.rows, settings.columns]);

  return {
    board,
    currentPlayer,
    gameState,
    placePiece,
    resetGame
  };
}