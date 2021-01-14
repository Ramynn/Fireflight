import {atom, useRecoilState} from 'recoil';
import {IPInfoInterface} from '../../types';

type StoredIPListState = [IPInfoInterface[], (value: IPInfoInterface[]) => void];

const recoilState = atom<IPInfoInterface[]>({
  key: 'StoredIPListState',
  default: []
});

export function useStoredIPListState(): StoredIPListState {
  const [state, setState] = useRecoilState(recoilState);

  return [state, setState];
}
