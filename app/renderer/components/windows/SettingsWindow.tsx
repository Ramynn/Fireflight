import React from 'react';
import {FunctionComponent} from 'react';
import {SettingsForm} from '../forms';
import {Container, WindowTitle} from '../units';
import {useTranslation} from 'react-i18next';

interface SettingsWindowProps {}

export const SettingsWindow: FunctionComponent<SettingsWindowProps> = () => {
  const {t} = useTranslation();

  return (
    <WindowTitle title={t('Windows.Titles.Settings')}>
      <Container>
        <SettingsForm />
      </Container>
    </WindowTitle>
  );
};
