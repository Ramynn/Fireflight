import React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {NavigationSecondaryMenu, NavigationMainMenu, NavigationLogo} from './index';
import {Container} from '../units';

interface NavigationProps {}

export const Navigation: FunctionComponent<NavigationProps> = () => {
  return (
    <NavigationHolder className="navigation-holder">
      <Container>
        <NavigationMainMenu />
        <NavigationLogo />
        <NavigationSecondaryMenu />
      </Container>
    </NavigationHolder>
  );
};

const NavigationHolder = styled.nav`
  height: 64px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-flow: row-reverse;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  > div {
    display: flex;
    justify-content: space-between;
    flex-flow: row-reverse;
    align-items: center;
    width: 100%;
  }
`;
