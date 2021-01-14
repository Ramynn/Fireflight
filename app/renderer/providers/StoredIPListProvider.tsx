import React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {useAppHashState, useLatestIPInfoState} from '../hooks';
import {useStoredIPListIPC} from '../hooks';

interface StoredIPListProviderProps {}

export const StoredIPListProvider: FunctionComponent<StoredIPListProviderProps> = ({children}) => {
  const [appHashState] = useAppHashState();
  const [latestIPInfoState] = useLatestIPInfoState();
  const [getStoredIP] = useStoredIPListIPC();

  useEffect(() => {
    getStoredIP();
  }, [latestIPInfoState?.IP, appHashState]);

  return <React.Fragment>{children}</React.Fragment>;
};
