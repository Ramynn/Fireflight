import React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {useAppSettingsIPC} from '../hooks';

interface AppSettingProviderProps {}

export const AppSettingProvider: FunctionComponent<AppSettingProviderProps> = ({children}) => {
  const [getAppSettingsIPC] = useAppSettingsIPC();

  useEffect(() => {
    getAppSettingsIPC();
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};
