import React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';

interface Container {}

export const Container: FunctionComponent<Container> = ({children}) => {
  return <ContainerHolder>{children}</ContainerHolder>;
};
const ContainerHolder = styled.div`
  padding: 0 20px;
`;
