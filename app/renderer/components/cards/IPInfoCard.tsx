import React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import ReactCountryFlag from 'react-country-flag';
import {Typography} from 'antd';
import {Card} from './Card';
import {useLatestIPInfoState} from '../../hooks';

interface IPInfoCardProps {}

export const IPInfoCard: FunctionComponent<IPInfoCardProps> = () => {
  const [latestIPInfoState] = useLatestIPInfoState();

  if (latestIPInfoState) {
    return (
      <Card color="green">
        <IPCountryFlagHolder>
          <ReactCountryFlag countryCode={latestIPInfoState.countryCode} svg={true} />
        </IPCountryFlagHolder>
        <IPAddressHolder>
          <Typography.Paragraph copyable={true} style={{marginBottom: 0}}>
            {latestIPInfoState.IP}
          </Typography.Paragraph>
        </IPAddressHolder>
        <IPLocationHolder>
          <IPCityLocationHolder>{latestIPInfoState.city}</IPCityLocationHolder>
          <IPCountryLocationHolder>{latestIPInfoState.country}</IPCountryLocationHolder>
        </IPLocationHolder>
      </Card>
    );
  }

  return null;
};

const IPCountryFlagHolder = styled.div`
  font-size: 60px;
  margin-top: -32px;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  width: 60px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IPAddressHolder = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
`;
const IPLocationHolder = styled.div`
  font-size: 12px;
`;
const IPCityLocationHolder = styled.div``;
const IPCountryLocationHolder = styled.div``;
