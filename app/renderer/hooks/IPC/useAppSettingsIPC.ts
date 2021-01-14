import {IPCAppSettingsParamsType, IPCChannelNames, AppSettingsInterface} from '../../types';
import {IPCHelper} from '../../helpers';
import {useAppHashState, useAppSettingsState} from '../states';

type UseAppSettingsIPC = [() => Promise<void>, (appSettings: AppSettingsInterface) => Promise<void>];

export function useAppSettingsIPC(): UseAppSettingsIPC {
  const [, updateAppHashState] = useAppHashState();
  const [, setAppSettingsState] = useAppSettingsState();

  async function get(): Promise<void> {
    try {
      const appSettings = await IPCHelper.send<IPCAppSettingsParamsType, AppSettingsInterface>(IPCChannelNames.AppSettingsChannel, {params: ['get']});

      setAppSettingsState(appSettings);
    } catch (error) {
      throw error;
    }
  }

  async function update(appSettings: AppSettingsInterface): Promise<void> {
    try {
      await IPCHelper.send<IPCAppSettingsParamsType, AppSettingsInterface>(IPCChannelNames.AppSettingsChannel, {params: ['update', appSettings]});

      setAppSettingsState(appSettings);
    } catch (error) {
      throw error;
    } finally {
      updateAppHashState();
    }
  }

  return [get, update];
}
