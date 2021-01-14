import React from 'react';
import {FunctionComponent, useMemo} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useAllowedIPListState, useAppHashState, useAppSettingsState, useLatestIPInfoState} from '../../hooks';

interface CurrentIPStatusInfoProps {}

export const CurrentIPStatusInfo: FunctionComponent<CurrentIPStatusInfoProps> = () => {
  const {t} = useTranslation();
  const [appSettingsState] = useAppSettingsState();
  const [latestIPInfoState] = useLatestIPInfoState();
  const [, , allowedIPListState] = useAllowedIPListState();
  const [appHashState] = useAppHashState();
  const isAllowed = useMemo<boolean>(() => {
    if (latestIPInfoState?.IP) {
      return allowedIPListState.contains(latestIPInfoState.IP) && appSettingsState.isEnabled;
    }

    return appSettingsState.isEnabled;
  }, [latestIPInfoState?.IP, appHashState, allowedIPListState, appSettingsState.isEnabled]);

  const status: 'Safe' | 'UnSafe' | 'NotConnected' | 'NetworkError' = latestIPInfoState ? (isAllowed ? 'Safe' : 'UnSafe') : 'NotConnected';

  return (
    <CurrentIPStatusInfoHolder>
      <React.Fragment>
        <ConnectionStatusHolder>
          <span>{t('Info.Connection.State.Title')}: </span>
          <strong className={status}>{t(`Info.Connection.State.${status}`)}</strong>
        </ConnectionStatusHolder>
      </React.Fragment>
    </CurrentIPStatusInfoHolder>
  );
};

const CurrentIPStatusInfoHolder = styled.div``;
const ConnectionStatusHolder = styled.div`
  font-size: 15px;
`;
// const ConnectionIPHolder = styled.div`
//   font-size: 14px;
//   font-weight: 700;
//   margin-top: 6px;
// `;
