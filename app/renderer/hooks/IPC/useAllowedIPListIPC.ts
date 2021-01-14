import {IPCAllowedIPListParamsType, IPCChannelNames} from '../../types';
import {IPCHelper} from '../../helpers';
import {useAllowedIPListState, useAppHashState} from '../states';

type UseAllowedIPListIPC = [() => Promise<void>, (IPList: string[]) => Promise<boolean>, (IPList: string[]) => Promise<boolean>];

export function useAllowedIPListIPC(): UseAllowedIPListIPC {
  const [, setAllowedIPListState] = useAllowedIPListState();
  const [, updateAppHashState] = useAppHashState();

  async function add(IPList: string[]): Promise<boolean> {
    try {
      return await IPCHelper.send<IPCAllowedIPListParamsType, boolean>(IPCChannelNames.AllowedIPListChannel, {params: ['add', IPList]});
    } catch (error) {
      throw error;
    } finally {
      updateAppHashState();
    }
  }

  async function remove(IPList: string[]): Promise<boolean> {
    try {
      return await IPCHelper.send<IPCAllowedIPListParamsType, boolean>(IPCChannelNames.AllowedIPListChannel, {params: ['remove', IPList]});
    } catch (error) {
      throw error;
    } finally {
      updateAppHashState();
    }
  }

  async function get(): Promise<void> {
    try {
      const list = await IPCHelper.send<IPCAllowedIPListParamsType, string[]>(IPCChannelNames.AllowedIPListChannel, {params: ['get', []]});

      setAllowedIPListState(list);
    } catch (error) {
      throw error;
    }
  }

  return [get, add, remove];
}
