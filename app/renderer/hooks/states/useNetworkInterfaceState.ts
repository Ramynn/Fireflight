import {atom, useRecoilState} from 'recoil';

type UseNetworkInterfaceState = [string, (value: string) => void];

const recoilState = atom<string>({
  key: 'UseNetworkInterfaceState',
  default: ''
});

export function useNetworkInterfaceState(): UseNetworkInterfaceState {
  const [state, setState] = useRecoilState(recoilState);

  return [state, setState];
}
