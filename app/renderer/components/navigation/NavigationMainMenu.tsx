import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {motion as Motion} from 'framer-motion';
import {NavigationButton} from './units';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import HistoryOutlined from '@ant-design/icons/HistoryOutlined';
import {fadeAnimation} from '../../animations';
import {useRouteMatch} from 'react-router';
import {routePaths} from '../../routes';

interface NavigationMainMenuProps {}

export const NavigationMainMenu: FunctionComponent<NavigationMainMenuProps> = () => {
  const settingsMatched = useRouteMatch({
    path: routePaths.settings
  });

  // const allowedIPMatched = useRouteMatch({
  //   path: routePaths.allowedIP
  // });

  const storedIPMatched = useRouteMatch({
    path: routePaths.storedIP,
    exact: true
  });

  return (
    <NavigationMenuHolder initial="hidden" animate="visible" variants={fadeAnimation}>
      {!storedIPMatched && <NavigationButton icon={HistoryOutlined} to={routePaths.storedIP} key="HistoryButton" />}
      {/*{!allowedIPMatched && <NavigationButton icon={UnorderedListOutlined} to={routePaths.allowedIP} key="AllowedIPButton" />}*/}
      {!settingsMatched && <NavigationButton icon={SettingOutlined} to={routePaths.settings} key="SettingsButton" />}
    </NavigationMenuHolder>
  );
};

const NavigationMenuHolder = styled(Motion.div)`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: flex-end;
`;
