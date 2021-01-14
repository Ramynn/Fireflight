import React from 'react';
import {FunctionComponent, Suspense} from 'react';
import {Navigation} from '../components/navigation';
import {ConfigProvider} from 'antd';
import styled, {ThemeProvider} from 'styled-components';
import {RecoilRoot} from 'recoil';
import {
  LatestIPInfoProvider,
  StoredIPListProvider,
  NetworkConnectionProvider,
  AllowedIPListProvider,
  AppSettingProvider,
  MemoryRouteProvider,
  AppRouteProvider,
  LocalizationProvider,
  AnalyticsProvider,
  UserInfoProvider
} from '.';

interface AppProviderProps {}

const defaultTheme = {};

export const AppProvider: FunctionComponent<AppProviderProps> = () => {
  return (
    <RecoilRoot>
      <ConfigProvider>
        <UserInfoProvider>
          <LocalizationProvider>
            <Suspense fallback={<div>Loading</div>}>
              <ThemeProvider theme={defaultTheme}>
                <AppSettingProvider>
                  <AllowedIPListProvider>
                    <NetworkConnectionProvider>
                      <LatestIPInfoProvider>
                        <StoredIPListProvider>
                          <AnalyticsProvider>
                            <MemoryRouteProvider>
                              <AppContentHolder>
                                <Navigation />
                                <AppRouteProvider />
                              </AppContentHolder>
                            </MemoryRouteProvider>
                          </AnalyticsProvider>
                        </StoredIPListProvider>
                      </LatestIPInfoProvider>
                    </NetworkConnectionProvider>
                  </AllowedIPListProvider>
                </AppSettingProvider>
              </ThemeProvider>
            </Suspense>
          </LocalizationProvider>
        </UserInfoProvider>
      </ConfigProvider>
    </RecoilRoot>
  );
};

const AppContentHolder = styled.div`
  margin-top: 86px;
`;
