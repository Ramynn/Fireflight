import {atom, useRecoilState} from 'recoil';

type UseWindowTitleState = [string, (value: string) => void];

const recoilState = atom<string>({
  key: 'UseWindowTitleState',
  default: 'App'
});

export function useWindowTitleState(): UseWindowTitleState {
  const [state, setState] = useRecoilState(recoilState);

  return [state, setState];
}
