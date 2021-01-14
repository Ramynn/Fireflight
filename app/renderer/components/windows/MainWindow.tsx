import React from 'react';
import {FunctionComponent} from 'react';
import {Container, WindowTitle} from '../units';
import {useTranslation} from 'react-i18next';
import {CurrentIPStatusIcon, CurrentIPStatusInfo} from '../inform';
import styled from 'styled-components';

interface SettingsWindowProps {}

export const MainWindow: FunctionComponent<SettingsWindowProps> = () => {
  const {t} = useTranslation();

  return (
    <WindowTitle title={t('Windows.Titles.Home')}>
      <Container>
        <MainWindowHolder>
          <CurrentIPStatusInfo />
          <CurrentIPStatusIcon />
        </MainWindowHolder>
      </Container>
    </WindowTitle>
  );
};

const MainWindowHolder = styled.div`
  text-align: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
`;
