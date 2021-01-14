import {IPCStoredIPListParamsType, IPCChannelNames, IPInfoInterface} from '../../types';
import {IPCHelper} from '../../helpers';
import {useAppHashState, useStoredIPListState} from '../states';

type UseStoredIPListIPC = [() => Promise<void>, (IPList: IPInfoInterface[]) => Promise<boolean>, (IPList: IPInfoInterface[]) => Promise<boolean>];

export function useStoredIPListIPC(): UseStoredIPListIPC {
  const [, setStoredIPListState] = useStoredIPListState();
  const [, updateAppHashState] = useAppHashState();

  async function add(IPList: IPInfoInterface[]): Promise<boolean> {
    try {
      return await IPCHelper.send<IPCStoredIPListParamsType, boolean>(IPCChannelNames.StoredIPListChannel, {params: ['add', IPList]});
    } catch (error) {
      throw error;
    } finally {
      updateAppHashState();
    }
  }

  async function remove(IPList: IPInfoInterface[]): Promise<boolean> {
    try {
      return await IPCHelper.send<IPCStoredIPListParamsType, boolean>(IPCChannelNames.StoredIPListChannel, {params: ['remove', IPList]});
    } catch (error) {
      throw error;
    } finally {
      updateAppHashState();
    }
  }

  async function get(): Promise<void> {
    try {
      const list = await IPCHelper.send<IPCStoredIPListParamsType, IPInfoInterface[]>(IPCChannelNames.StoredIPListChannel, {params: ['get', []]});

      setStoredIPListState(list);
    } catch (error) {
      throw error;
    }
  }

  return [get, add, remove];
}
