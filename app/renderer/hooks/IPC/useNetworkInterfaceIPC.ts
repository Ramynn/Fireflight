import {IPCNetworkParamsType, IPCChannelNames} from '../../types';
import {debugHelper, IPCHelper} from '../../helpers';
import {useNetworkConnectionState, useNetworkInterfaceState} from '../states';

type UseNetworkInterfaceIPC = [() => Promise<void>];

export function useNetworkInterfaceIPC(): UseNetworkInterfaceIPC {
  const [networkInterfaceState, setNetworkInterfaceState] = useNetworkInterfaceState();
  const [networkConnectionState] = useNetworkConnectionState();

  async function get(): Promise<void> {
    if (networkConnectionState) {
      try {
        const currentNetworkInterface = await IPCHelper.send<IPCNetworkParamsType, string>(IPCChannelNames.NetworkChannel, {params: ['get-interface-name']});

        if (networkInterfaceState !== currentNetworkInterface) {
          debugHelper.log('UseNetworkInterfaceIPC', 'Set current network interface', currentNetworkInterface);
          setNetworkInterfaceState(currentNetworkInterface);
        }
      } catch (error) {
        throw error;
      }
    }
  }

  return [get];
}
