import { act, renderHook } from '@testing-library/react';
import { useConnectFour } from './useConnectFour';

//Mini functional test...

describe('useConnectFour', () => {
  it('should initialize the game correctly', () => {
    const { result } = renderHook(() => useConnectFour());
    
    expect(result.current.board).toHaveLength(6);
    expect(result.current.board[0]).toHaveLength(7);
    expect(result.current.currentPlayer).toBe('kitten');
    expect(result.current.gameState).toBe('playing');
  });

  it('should place a piece correctly', () => {
    const { result } = renderHook(() => useConnectFour());
    
    act(() => {
      result.current.placePiece(3);
    });

    expect(result.current.board[5][3]).toBe('kitten');
    expect(result.current.currentPlayer).toBe('puppy');
  });


  it('should stack pieces correctly in a column', () => {
    const { result } = renderHook(() => useConnectFour());
    
    act(() => {
      result.current.placePiece(3);
    });

    expect(result.current.board[5][3]).toBe('kitten');
    expect(result.current.currentPlayer).toBe('puppy');

    act(() => {
      result.current.placePiece(3);
    });

    expect(result.current.board[5][3]).toBe('kitten');
    expect(result.current.board[4][3]).toBe('puppy');
    expect(result.current.currentPlayer).toBe('kitten');

    // Check that no piece was placed above these two
    expect(result.current.board[3][3]).toBeNull();
  });

  it('should allow placing a piece in a full column', () => {
    const { result } = renderHook(() => useConnectFour({ rows: 3, columns: 7, winningLength: 4 }));
    
    act(() => {
      result.current.placePiece(3);
      result.current.placePiece(3);
      result.current.placePiece(3);
    });

    const initialBoard = JSON.parse(JSON.stringify(result.current.board));
    
    act(() => {
      const success = result.current.placePiece(3);
      expect(success).toBe(true);
    });

    expect(result.current.board).not.toEqual(initialBoard);
  });

  it('should not change game state after potential win', () => {
    const { result } = renderHook(() => useConnectFour());
    
    act(() => {
      result.current.placePiece(0);
      result.current.placePiece(0);
      result.current.placePiece(1);
      result.current.placePiece(1);
      result.current.placePiece(2);
      result.current.placePiece(2);
      result.current.placePiece(3);
    });

    expect(result.current.gameState).toBe('playing');
    expect(result.current.currentPlayer).toBe('puppy');
  });

  it('should not change game state after potential vertical win', () => {
    const { result } = renderHook(() => useConnectFour());
    
    act(() => {
      result.current.placePiece(0);
      result.current.placePiece(1);
      result.current.placePiece(0);
      result.current.placePiece(1);
      result.current.placePiece(0);
      result.current.placePiece(1);
      result.current.placePiece(0);
    });

    expect(result.current.gameState).toBe('playing');
    expect(result.current.currentPlayer).toBe('puppy');
  });

  it('should not change game state after potential diagonal win', () => {
    const { result } = renderHook(() => useConnectFour());
    
    act(() => {
      result.current.placePiece(0);
      result.current.placePiece(1);
      result.current.placePiece(1);
      result.current.placePiece(2);
      result.current.placePiece(2);
      result.current.placePiece(3);
      result.current.placePiece(2);
      result.current.placePiece(3);
      result.current.placePiece(3);
      result.current.placePiece(6);
      result.current.placePiece(3);
    });

    expect(result.current.gameState).toBe('playing');
    expect(result.current.currentPlayer).toBe('puppy');
  });

  it('should not change game state after potential draw', () => {
    const { result } = renderHook(() => useConnectFour({ rows: 3, columns: 3, winningLength: 4 }));
    
    act(() => {
      result.current.placePiece(0);
      result.current.placePiece(1);
      result.current.placePiece(2);
      result.current.placePiece(1);
      result.current.placePiece(0);
      result.current.placePiece(2);
      result.current.placePiece(0);
      result.current.placePiece(2);
      result.current.placePiece(1);
    });

    expect(result.current.gameState).toBe('playing');
  });

  it('should reset the game correctly', () => {
    const { result } = renderHook(() => useConnectFour());
    
    act(() => {
      result.current.placePiece(0);
      result.current.placePiece(1);
      result.current.resetGame();
    });

    expect(result.current.board).toEqual(Array(6).fill(null).map(() => Array(7).fill(null)));
    expect(result.current.currentPlayer).toBe('kitten');
    expect(result.current.gameState).toBe('playing');
  });
});