import React from 'react';
import styled from 'styled-components';
import Props from './Props';

const Button = styled.button`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.mainColor};
  border: none;
  cursor: pointer;
`;

const Icon = styled.span`
  font-size: 24px;
  color: ${({ theme }) => theme.lightColor};
`;

export default ({ icon, onClick }: Props) =>
  <Button onClick={onClick}>
    <Icon className='material-icons'>{icon}</Icon>
  </Button>;
