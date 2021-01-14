import React from 'react';
import {FunctionComponent} from 'react';
import {Container, WindowTitle} from '../units';
import {StoredIPList} from '../lists';
import {useTranslation} from 'react-i18next';

interface StoredIPsWindowProps {}

export const StoredIPsWindow: FunctionComponent<StoredIPsWindowProps> = () => {
  const {t} = useTranslation();

  return (
    <WindowTitle title={t('Windows.Titles.StoredIPs')}>
      <Container>
        <StoredIPList />
      </Container>
    </WindowTitle>
  );
};
