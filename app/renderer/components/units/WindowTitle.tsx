import React from 'react';
import {FunctionComponent, useEffect} from 'react';
import {useWindowTitleState} from '../../hooks';

interface WindowTitleProps {
  title: string;
}

export const WindowTitle: FunctionComponent<WindowTitleProps> = ({children, title}) => {
  const [windowTitleState, setWindowTitle] = useWindowTitleState();

  useEffect(() => {
    if (title !== windowTitleState) {
      setWindowTitle(title);
    }
  }, [windowTitleState, title]);

  return <React.Fragment>{children}</React.Fragment>;
};
