import {atom, useRecoilState} from 'recoil';
import {UserInfoInterface} from '../../types';

type UseCurrentUserInfoState = [UserInfoInterface | undefined, (value: UserInfoInterface) => void];

const recoilState = atom<UserInfoInterface | undefined>({
  key: 'UseCurrentUserInfoState',
  default: undefined
});

export function useCurrentUserInfoState(): UseCurrentUserInfoState {
  const [state, setState] = useRecoilState(recoilState);

  return [state, setState];
}
