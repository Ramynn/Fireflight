import {atom, useRecoilState} from 'recoil';
import {AppSettingsInterface} from '../../types';
import {defaultAppSettings} from '../../constants';

type UseAppSettingsState = [AppSettingsInterface, (value: AppSettingsInterface) => void];

const recoilState = atom<AppSettingsInterface>({
  key: 'UseAppSettingsState',
  default: defaultAppSettings
});

export function useAppSettingsState(): UseAppSettingsState {
  const [state, setState] = useRecoilState(recoilState);

  return [state, setState];
}
