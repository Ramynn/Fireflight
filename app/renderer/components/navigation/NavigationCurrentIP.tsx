import React from 'react';
import {Typography} from 'antd';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import ReactCountryFlag from 'react-country-flag';
import {Skeleton, Space} from 'antd';
import WarningOutlined from '@ant-design/icons/WarningOutlined';
import {useLatestIPInfoState, useNetworkConnectionState} from '../../hooks';

interface NavigationCurrentIPProps {}

export const NavigationCurrentIP: FunctionComponent<NavigationCurrentIPProps> = () => {
  const [latestIPInfoState] = useLatestIPInfoState();
  const [networkConnectionState] = useNetworkConnectionState();

  if (!networkConnectionState) {
    return (
      <NavigationCurrentIPHolder style={{color: '#bb4242'}}>
        <Space align="center">
          <WarningOutlined />
          You are offline
        </Space>
      </NavigationCurrentIPHolder>
    );
  }

  if (latestIPInfoState) {
    return (
      <NavigationCurrentIPHolder>
        <Space align="center">
          <ReactCountryFlag countryCode={latestIPInfoState.countryCode} svg={true} />
          <Typography.Paragraph copyable={true} style={{marginBottom: 0}}>
            {latestIPInfoState.IP}
          </Typography.Paragraph>
        </Space>
      </NavigationCurrentIPHolder>
    );
  }

  return (
    <NavigationCurrentIPHolder>
      <Space align="center">
        <Skeleton.Avatar active={true} size={16} shape="square" />
        <Skeleton.Input style={{width: 120, height: 16}} active={true} size="small" />
      </Space>
    </NavigationCurrentIPHolder>
  );
};

const NavigationCurrentIPHolder = styled.div`
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  img {
    width: 16px !important;
    height: 16px !important;
  }
`;
