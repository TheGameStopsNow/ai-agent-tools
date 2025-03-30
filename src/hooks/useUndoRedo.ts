import { useState, useCallback } from 'react';

interface UseUndoRedoOptions<T> {
  initialState: T;
}

interface UseUndoRedoReturn<T> {
  state: T;
  setState: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function useUndoRedo<T>({ initialState }: UseUndoRedoOptions<T>): UseUndoRedoReturn<T> {
  const [state, setState] = useState<T>(initialState);
  const [past, setPast] = useState<T[]>([]);
  const [future, setFuture] = useState<T[]>([]);

  const updateState = useCallback((newState: T) => {
    setPast((prev) => [...prev, state]);
    setState(newState);
    setFuture([]);
  }, [state]);

  const undo = useCallback(() => {
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setState(previous);
    setFuture((prev) => [state, ...prev]);
  }, [past, state]);

  const redo = useCallback(() => {
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast((prev) => [...prev, state]);
    setState(next);
    setFuture(newFuture);
  }, [future, state]);

  const reset = useCallback(() => {
    setState(initialState);
    setPast([]);
    setFuture([]);
  }, [initialState]);

  return {
    state,
    setState: updateState,
    undo,
    redo,
    reset,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
} 