import React from 'react';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {IPInfoCard} from './IPInfoCard';

interface IntroCardsProps {}

export const IntroCards: FunctionComponent<IntroCardsProps> = () => {
  return (
    <IntroCardsHolder>
      <IntroMainCards>
        <IPInfoCard />
      </IntroMainCards>
    </IntroCardsHolder>
  );
};

const IntroCardsHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 134px;
  margin: 16px 0;
`;
const IntroMainCards = styled.div`
  height: 134px;
  width: 100%;
`;
