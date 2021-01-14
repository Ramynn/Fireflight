import {atom, useRecoilState} from 'recoil';
import {NetworkConnectionType} from '../../types';

type UseNetworkConnectionState = [boolean, (value: NetworkConnectionType) => void];

const recoilState = atom<NetworkConnectionType>({
  key: 'UseNetworkConnectionState',
  default: navigator.onLine ? 'online' : 'offline'
});

export function useNetworkConnectionState(): UseNetworkConnectionState {
  const [state, setState] = useRecoilState(recoilState);

  return [state === 'online', setState];
}
