import React, {FunctionComponent, useEffect} from 'react';
import {Route, Switch, useLocation} from 'react-router';
import {SettingsWindow, StoredIPsWindow} from '../components/windows';
import {motion as Motion} from 'framer-motion';
import {fadeAnimation} from '../animations';
import {routePaths} from '../routes';
import {message} from 'antd';

interface AppRouteProviderProps {}

export const AppRouteProvider: FunctionComponent<AppRouteProviderProps> = () => {
  const location = useLocation();

  useEffect(() => {
    message.destroy();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Motion.div key={location.key} initial="hidden" animate="visible" variants={fadeAnimation}>
      <Switch location={location}>
        <Route component={SettingsWindow} path={routePaths.settings} key="SettingsWindow" />
        {/*<Route component={AllowedIPsWindow} path={routePaths.allowedIP} key="AllowedIPsWindow" />*/}
        <Route component={StoredIPsWindow} path={routePaths.storedIP} exact={true} key="AllowedIPsWindow" />
        {/*<Route component={MainWindow} path={routePaths.main} exact={true} key="MainWindow" />*/}
      </Switch>
    </Motion.div>
  );
};
