import { useConnectFour } from "@/hooks/useConnectFour/useConnectFour";
import React from "react";

  
export default function ConnectFourBoard() {
  const { board, currentPlayer, gameState, placePiece, resetGame } = useConnectFour();

  const handleColumnClick = (columnIndex: number) => {
    placePiece(columnIndex);
  };

    return (
      <div className="flex flex-col items-center">
      <div className="grid grid-cols-7 gap-2 bg-blue-200 p-4 rounded-lg">
        {board.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <button 
              key={`${rowIndex}-${colIndex}`}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
              onClick={() => handleColumnClick(colIndex)}
              disabled={gameState !== 'playing'}
            >
              {cell === 'kitten' && <span className="text-4xl">😺</span>}
              {cell === 'puppy' && <span className="text-4xl">🐶</span>}
            </button>
          ))
        )}
      </div>
      <div className="mt-4">
        <p>Current Player: {currentPlayer === 'kitten' ? '😺' : '🐶'}</p>
        <p>Game State: {gameState}</p>
      </div>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
    );
  };