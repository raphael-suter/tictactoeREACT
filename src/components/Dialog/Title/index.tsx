import React from 'react';
import styled from 'styled-components';
import Props from './Props';

const Title = styled.h1`
  display: block;
  margin: 0.6rem 0.6rem 0.2rem;
  font-weight: 100;
  font-size: 30px;
`;

export default ({ text }: Props) =>
  <Title>{text}</Title>;
