import React from 'react';
import {FunctionComponent} from 'react';
import {Container, WindowTitle} from '../units';
import {AllowedIPList} from '../lists';
import {useTranslation} from 'react-i18next';

interface AllowedIPsWindowProps {}

export const AllowedIPsWindow: FunctionComponent<AllowedIPsWindowProps> = () => {
  const {t} = useTranslation();

  return (
    <WindowTitle title={t('Windows.Titles.AllowedIPs')}>
      <Container>
        <AllowedIPList />
      </Container>
    </WindowTitle>
  );
};
