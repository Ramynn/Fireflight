import {atom, useRecoilState} from 'recoil';
import {stringHelper} from '../../helpers';

type UseAppHashState = [string, () => void];

const recoilState = atom<string>({
  key: 'UseAppHashState',
  default: stringHelper.random()
});

export function useAppHashState(): UseAppHashState {
  const [state, setState] = useRecoilState(recoilState);

  function update() {
    setState(stringHelper.random());
  }

  return [state, update];
}
