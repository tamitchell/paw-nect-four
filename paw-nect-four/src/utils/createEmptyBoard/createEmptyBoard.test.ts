import { Board } from "@/types/types";
import { createEmptyBoard } from "./createEmptyBoard";

describe('createEmptyBoard', () => {
    test('should create a 6x7 board by default', () => {
      const board: Board = createEmptyBoard(); // use the default 6x7
      
      // Check if the number of rows is 6
      expect(board.length).toBe(6);
      
      // Check if each row has 7 columns
      board.forEach(row => {
        expect(row.length).toBe(7);
        // Check if all cells in the row are initialized to null
        row.forEach(cell => {
          expect(cell).toBeNull();
        });
      });
    });
  
    test('should create a board with custom dimensions', () => {
      const customRows = 8;
      const customColumns = 10;
      const board: Board = createEmptyBoard(customRows, customColumns); // Create an 8x10 board
      
      // Check if the number of rows is 8
      expect(board.length).toBe(customRows);
      
      // Check if each row has 10 columns
      board.forEach(row => {
        expect(row.length).toBe(customColumns);
        // Check if all cells in the row are initialized to null
        row.forEach(cell => {
          expect(cell).toBeNull();
        });
      });
    });
  });