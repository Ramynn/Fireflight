import React from 'react';
import {FunctionComponent} from 'react';
import styled, {css} from 'styled-components';

type CardColor = 'green' | 'blue' | 'silver' | 'red' | 'yellow';

interface CardProps {
  color: CardColor;
}

export const Card: FunctionComponent<CardProps> = ({children, color}) => {
  return <IPCardHolder color={color}>{children}</IPCardHolder>;
};

const IPCardHolder = styled.div<{color: CardColor}>`
  background: linear-gradient(45deg, #12b2ff 0%, #92fef4 100%);
  border-radius: 10px;
  padding: 18px;
  font-size: 16px;
  text-shadow: 1px 1px #00000014;
  ${(props) =>
    props.color === 'red' &&
    css`
      background: linear-gradient(45deg, #ff123e 0%, #fea692 100%);
    `}
  ${(props) =>
    props.color === 'blue' &&
    css`
      background: linear-gradient(45deg, #3f43bf 0%, #7098f3 100%);
    `}
  ${(props) =>
    props.color === 'yellow' &&
    css`
      background: linear-gradient(45deg, #ffb612 0%, #f7fe92 100%);
    `}
`;
