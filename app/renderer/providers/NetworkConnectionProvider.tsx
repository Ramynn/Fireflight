import React from 'react';
import {FunctionComponent} from 'react';
import {useInterval, useNetworkConnectionState, useNetworkInterfaceIPC, useNetworkInterfaceState, useWindowEventListener} from '../hooks';

interface NetworkConnectionProviderProps {}

export const NetworkConnectionProvider: FunctionComponent<NetworkConnectionProviderProps> = ({children}) => {
  const [getNetworkInterfaceIPC] = useNetworkInterfaceIPC();
  const [networkConnectionState, setNetworkConnectionState] = useNetworkConnectionState();
  const [networkInterfaceState] = useNetworkInterfaceState();

  useWindowEventListener('online', setOnlineState);
  useWindowEventListener('offline', setOfflineState);

  useInterval(getNetworkInterfaceIPC, 2000, true, [networkInterfaceState, networkConnectionState]);

  function setOnlineState() {
    setNetworkConnectionState('online');
  }

  function setOfflineState() {
    setNetworkConnectionState('offline');
  }

  return <React.Fragment>{children}</React.Fragment>;
};
