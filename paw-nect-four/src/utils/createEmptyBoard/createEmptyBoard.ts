import { Board } from "../../types/types";

/**
 * TODO:
 *  Technically, we can control the difficulty or duration of the game with a 
 * preset number of rows and columns. smaller dimension === simpler/faster game.
 * I'd like for these to be preset so i don't have to validate user input. Also I'm sure the game has
 * preset standards already...
 * 
 */
export function createEmptyBoard(rows: number = 6, columns: number = 7): Board {
    return Array(rows).fill(null).map(() => Array(columns).fill(null));
  }
  