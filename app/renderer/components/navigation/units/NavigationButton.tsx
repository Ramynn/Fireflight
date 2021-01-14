import React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

interface NavigationButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: FunctionComponent;
  to?: string;
}

export const NavigationButton: FunctionComponent<NavigationButtonProps> = ({icon: IconComponent, to, ...props}) => {
  const history = useHistory();

  return (
    <NavigationButtonHolder {...props} onClick={to ? () => history.push(to) : undefined}>
      <IconComponent />
    </NavigationButtonHolder>
  );
};

const NavigationButtonHolder = styled.div<{isActive?: boolean}>`
  //background: #00000061;
  font-size: 18px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
`;
