import React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import SafetyOutlined from '@ant-design/icons/SafetyOutlined';

interface CurrentIPStatusInfoProps {}

export const CurrentIPStatusIcon: FunctionComponent<CurrentIPStatusInfoProps> = () => {
  return (
    <CurrentIPStatusInfoHolder>
      <SafetyOutlined />
    </CurrentIPStatusInfoHolder>
  );
};

const CurrentIPStatusInfoHolder = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 100%;
  background: #1e5dff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 56px;
  margin: 4rem auto;
  box-shadow: 0 0 0 16px #1e5dff36, 0 0 38px #1752f98f;
`;
