/**
 * Represents the state of a single cell on the game board.
 * Can be 'kitten' for a kitten piece, 'puppy' for a puppy piece, or null for an empty cell.
 */
export type CellState = 'kitten' | 'puppy' | null;

/**
 * 2D array of CellStates.
 * Represents gameboard.
 */
export type Board = CellState[][];

/**
 * Represents a player in the game.
 * Can be either 'kitten' or 'puppy'.
 */
export type Player = 'kitten' | 'puppy';


/**
 * Represents the current state of the game.
 * 'playing' means the game is ongoing, 'won' means a player has won, and 'draw' means the game ended in a draw.
 */
export type GameState = 'playing' | 'won' | 'draw';

/**
 * Represents a single move in the game.
 */
export type Move = {
    player: Player;
    column: number;
};

/**
 * Represents the settings for a game of Connect Four.
 */
export type GameSettings = {
    rows: number;
    columns: number;
    /** The number of pieces in a row needed to win */
    winningLength: number;
};