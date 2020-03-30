import React from 'react';
import styled from 'styled-components';
import Props from './Props';

const Button = styled.button`
  margin: 0.6rem;
  padding: 0.5rem 2rem;
  text-transform: uppercase;
  font-size: 16px;
  border: none;
  background: ${({ theme }) => theme.mainColor};
  color: ${({ theme }) => theme.lightColor};
  cursor: pointer;
`;

export default ({ text, onClick }: Props) =>
  <Button onClick={onClick}>{text}</Button>;
