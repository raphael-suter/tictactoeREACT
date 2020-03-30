import React from 'react';
import styled from 'styled-components';
import Props from './Props';

const Div = styled.div`
  margin: 0.3rem;
  position: relative;

  &::before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  font-size: 52px;
  background: ${({ theme }) => theme.mediumColor};
  box-shadow: inset 0 0 2px 0 ${({ theme }) => theme.shadowColor};
  border: none;
  cursor: pointer;
`;

export default ({ content, onClick }: Props) => (
  <Div>
    <Button onClick={onClick} aria-label='field'>{content}</Button>
  </Div>
);
