import { Dispatch, Reducer, useEffect, useReducer } from "react";

/**
 * Works simillar to useReducer, but it also writes the state information to the local storage.
 * That way refreshing the page keeps the current configuration.
 * @param reducer reducer function
 * @param initialState initial state value
 * @param key key under which the state information should be stored
 * @param config if the state should only partly be saved
 * this array should contain all fields of the state that should be saved.
 * @return [state, dispatch] like useReducer does
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
export const useReducerWithLocalStorage = <TState, TAction>(
  reducer: Reducer<TState, TAction>,
  initialState: TState,
  key: string,
  config?: (keyof TState)[]
): [TState, Dispatch<TAction>] => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const savedState = localStorage.getItem(key);
    return savedState
      ? Object.assign(JSON.parse(savedState), initialState)
      : initialState;
  });

  useEffect(() => {
    let stateToSave: any = {};
    config
      ? config.map((key) => (stateToSave[key] = state[key]))
      : (stateToSave = state);
    Object.keys(stateToSave).length === 0 &&
      stateToSave.constructor === Object &&
      localStorage.setItem(key, JSON.stringify(stateToSave));
  }, [key, state]);

  return [state, dispatch];
};
