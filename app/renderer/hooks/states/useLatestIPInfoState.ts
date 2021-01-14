import {atom, useRecoilState} from 'recoil';
import {IPInfoInterface} from '../../types';

type UseLatestIPInfoState = [IPInfoInterface | undefined, (value: IPInfoInterface | undefined) => void];

const recoilState = atom<IPInfoInterface | undefined>({
  key: 'UseLatestIPInfoState',
  default: undefined
});

export function useLatestIPInfoState(): UseLatestIPInfoState {
  const [state, setState] = useRecoilState(recoilState);

  return [state, setState];
}
