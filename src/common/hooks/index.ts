import { DependencyList, useCallback, useContext, useEffect, useRef } from 'react';
type Callback = () => Promise<any>;

type Deps = readonly any[];

/**
 *
 * @param callback callback
 * @param deps dependences
 */
export function useAsyncEffect(callback: Callback, deps: Deps = []) {
  useEffect(() => {
    callback().catch(e => console.log('useAsyncEffect error:', e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}


export function usePrevious<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}






