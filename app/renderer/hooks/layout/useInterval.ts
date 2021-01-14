import {useEffect} from 'react';

type UseInterval = [() => void];

export function useInterval(callback: () => void, delay: number, runOnInit: boolean = false, depends: unknown[]): UseInterval {
  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (runOnInit) {
      tick();
    }

    set();

    return () => clear();
  }, [delay, ...depends]);

  function tick() {
    callback();
  }

  function set() {
    if (interval) {
      clear();
    }

    interval = setInterval(tick, delay);
  }

  function clear() {
    if (interval) {
      clearInterval(interval);
    }
  }

  return [clear];
}
