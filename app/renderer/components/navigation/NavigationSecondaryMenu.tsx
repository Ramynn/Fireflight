import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import {fadeAnimation} from '../../animations';
import {motion as Motion} from 'framer-motion';

interface NavigationSecondaryMenuProps {}

export const NavigationSecondaryMenu: FunctionComponent<NavigationSecondaryMenuProps> = () => {
  // const mainRouteMatched = useRouteMatch({
  //   path: routePaths.main,
  //   exact: true
  // });

  return (
    <NavigationMenuHolder initial="hidden" animate="visible" variants={fadeAnimation}>
      {/*{!mainRouteMatched && <NavigationButton icon={ArrowLeftOutlined} to={routePaths.main} />}*/}
    </NavigationMenuHolder>
  );
};

const NavigationMenuHolder = styled(Motion.div)`
  display: flex;
  align-items: center;
  width: 100px;
`;
