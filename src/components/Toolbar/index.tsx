import React from 'react';
import styled from 'styled-components';
import Props from './Props';

const Toolbar = styled.header`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.mainColor};
  box-shadow: 0 0 2px 0 ${({ theme }) => theme.shadowColor};

  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

const Title = styled.h1`
  flex: 1;
  padding: 0.8rem 1.2rem;
  font-size: 24px;
  font-weight: 100;
  color: ${({ theme }) => theme.lightColor};
`;

const Score = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.lightColor};

  @media (max-width: 800px) {
    order: 1;
    flex-basis: 100%;
    padding: 0.6rem 1.5rem;
    text-align: center;
    background: ${({ theme }) => theme.mediumColor};
    color: ${({ theme }) => theme.darkColor};
  }
`;

const ButtonGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding: 0.8rem 1.2rem;
`;

export default ({ title, score, children }: Props) =>
  <Toolbar>
    <Title>{title}</Title>
    <Score>{score}</Score>
    <ButtonGroup>{children}</ButtonGroup>
  </Toolbar>;
