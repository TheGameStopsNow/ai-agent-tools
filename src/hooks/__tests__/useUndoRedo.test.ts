import { renderHook, act } from '@testing-library/react';
import { useUndoRedo } from '../useUndoRedo';

describe('useUndoRedo', () => {
  it('should initialize with initial state', () => {
    const { result } = renderHook(() => useUndoRedo({ initialState: 'initial' }));
    expect(result.current.state).toBe('initial');
  });

  it('should update state and maintain history', () => {
    const { result } = renderHook(() => useUndoRedo({ initialState: 'initial' }));

    act(() => {
      result.current.setState('first');
    });

    expect(result.current.state).toBe('first');

    act(() => {
      result.current.setState('second');
    });

    expect(result.current.state).toBe('second');
  });

  it('should undo changes', () => {
    const { result } = renderHook(() => useUndoRedo({ initialState: 'initial' }));

    act(() => {
      result.current.setState('first');
    });

    act(() => {
      result.current.setState('second');
    });

    act(() => {
      result.current.undo();
    });

    expect(result.current.state).toBe('first');
  });

  it('should redo undone changes', () => {
    const { result } = renderHook(() => useUndoRedo({ initialState: 'initial' }));

    act(() => {
      result.current.setState('first');
    });

    act(() => {
      result.current.setState('second');
    });

    act(() => {
      result.current.undo();
    });

    act(() => {
      result.current.redo();
    });

    expect(result.current.state).toBe('second');
  });

  it('should clear history when resetting', () => {
    const { result } = renderHook(() => useUndoRedo({ initialState: 'initial' }));

    act(() => {
      result.current.setState('first');
    });

    act(() => {
      result.current.setState('second');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.state).toBe('initial');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });
}); 