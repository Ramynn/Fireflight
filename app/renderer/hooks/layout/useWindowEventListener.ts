import {useEffect} from 'react';

export function useWindowEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | EventListenerOptions
): void {
  useEffect(() => {
    window.addEventListener(type, listener, options);

    return () => {
      window.removeEventListener(type, listener, options);
    };
  }, [type]);

  return;
}
