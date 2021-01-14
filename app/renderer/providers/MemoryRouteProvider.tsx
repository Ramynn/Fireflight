import React from 'react';
import {FunctionComponent} from 'react';
import {MemoryRouter} from 'react-router';

interface MemoryRouteProviderProps {}

export const MemoryRouteProvider: FunctionComponent<MemoryRouteProviderProps> = ({children}) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};
