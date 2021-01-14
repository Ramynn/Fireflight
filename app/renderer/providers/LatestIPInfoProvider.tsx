import React from 'react';
import {FunctionComponent, useCallback, useEffect} from 'react';
import {debugHelper, IPHelper} from '../helpers';
import {useTranslation} from 'react-i18next';
import {message} from 'antd';
import {useAppHashState, useAppSettingsState, useLatestIPInfoState, useNetworkConnectionState, useNetworkInterfaceState} from '../hooks';
import {useStoredIPListIPC} from '../hooks';

interface LatestIPInfoProviderProps {}

export const LatestIPInfoProvider: FunctionComponent<LatestIPInfoProviderProps> = ({children}) => {
  const {t} = useTranslation();
  const [appHashState] = useAppHashState();
  const [appSettingsState] = useAppSettingsState();
  const [latestIPInfoState, setLatestIPInfoState] = useLatestIPInfoState();
  const [networkConnectionState] = useNetworkConnectionState();
  const [networkInterfaceHashState] = useNetworkInterfaceState();
  const [, addStoredIP] = useStoredIPListIPC();
  const checkCurrentIP = useCallback(async (): Promise<void> => {
    try {
      debugHelper.log('LatestIPInfoProvider', 'Check current IP');

      const IPInfo = await IPHelper.getCurrentIPInfo();

      if (latestIPInfoState?.IP !== IPInfo.IP) {
        debugHelper.log('LatestIPInfoProvider', 'Check current IP', 'New IP is detected', IPInfo);
        await addStoredIP([IPInfo]);

        if (appSettingsState?.newIPNotification) {
          new Notification(t(`Notifications.IPChange.Title`), {
            body: t(`Notifications.IPChange.Message`, {IP: IPInfo.IP, city: IPInfo.city, country: IPInfo.country}),
            silent: false
          });
        }

        setLatestIPInfoState(IPInfo);
      }
    } catch (error) {
      message.destroy();
      message.error(t('Notifications.LatestIP.FetchError.Message'));
      debugHelper.error('LatestIPInfoProvider', 'Check current IP', error);
    }
  }, [latestIPInfoState?.IP, appSettingsState?.newIPNotification]);

  useEffect(() => {
    if (networkConnectionState && appSettingsState?.interval) {
      checkCurrentIP();

      const IPCheckerInterval = setInterval(() => checkCurrentIP(), appSettingsState.interval);

      debugHelper.log('LatestIPInfoProvider', 'Register new interval');

      return () => {
        clearInterval(IPCheckerInterval);
        debugHelper.log('LatestIPInfoProvider', 'Remove interval');
      };
    }

    return;
  }, [networkConnectionState, appSettingsState?.interval, checkCurrentIP, networkInterfaceHashState, appHashState]);

  return <React.Fragment>{children}</React.Fragment>;
};
