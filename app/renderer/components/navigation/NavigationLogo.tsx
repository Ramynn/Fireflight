import React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {useWindowTitleState} from '../../hooks';

interface NavigationLogoProps {}

export const NavigationLogo: FunctionComponent<NavigationLogoProps> = () => {
  const [windowTitleState] = useWindowTitleState();

  return (
    <NavigationLogoHolder>
      <NavigationLogoHeading>{windowTitleState}</NavigationLogoHeading>
    </NavigationLogoHolder>
  );
};

const NavigationLogoHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const NavigationLogoHeading = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 18px;
`;
