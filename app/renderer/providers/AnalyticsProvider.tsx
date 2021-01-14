import React, {useEffect} from 'react';
import {FunctionComponent} from 'react';
import {useCurrentUserInfoState} from '../hooks';

interface AnalyticsProviderProps {}

export const AnalyticsProvider: FunctionComponent<AnalyticsProviderProps> = ({children}) => {
  const [currentUserInfoState] = useCurrentUserInfoState();

  useEffect(() => {
    if (currentUserInfoState) {
      const {ID, ...userIdentify} = currentUserInfoState;

      console.log('set user identify', ID, userIdentify);
    }
  }, [currentUserInfoState]);

  return <React.Fragment>{children}</React.Fragment>;
};
