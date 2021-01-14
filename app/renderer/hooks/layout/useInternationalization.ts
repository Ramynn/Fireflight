import {useMemo} from 'react';

type UseInternationalization = [Intl.DateTimeFormat];

export function useInternationalization(): UseInternationalization {
  const internationalization = useMemo(() => {
    return new Intl.DateTimeFormat('en-US');
  }, []);

  return [internationalization];
}
