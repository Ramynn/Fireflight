import React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {useCurrentUserInfoIPC} from '../hooks';

interface UserInfoProviderProps {}

export const UserInfoProvider: FunctionComponent<UserInfoProviderProps> = ({children}) => {
  const [getCurrentUserInfoIPC] = useCurrentUserInfoIPC();

  useEffect(() => {
    getCurrentUserInfoIPC();
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};
