import React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {useAppHashState} from '../hooks';
import {useAllowedIPListIPC} from '../hooks';

interface AllowedIPListProviderProps {}

export const AllowedIPListProvider: FunctionComponent<AllowedIPListProviderProps> = ({children}) => {
  const [updateAllowedIPList] = useAllowedIPListIPC();
  const [appHashState] = useAppHashState();

  useEffect(() => {
    updateAllowedIPList();
  }, [appHashState]);

  return <React.Fragment>{children}</React.Fragment>;
};
