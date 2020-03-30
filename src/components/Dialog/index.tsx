import React from 'react';
import styled from 'styled-components';
import Props from './Props';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem;
  background: ${({ theme }) => theme.shadowColor};
`;

const Card = styled.article`
  max-width: 500px;
  margin: auto;
  padding: 0.6rem;
  box-shadow: 0 0 2px 0 ${({ theme }) => theme.shadowColor};
  background: ${({ theme }) => theme.lightColor};
  flex: 1;
`;

export default ({ children }: Props) =>
  /* The parent div is used to center the article vertically and horizontally and to cover the whole viewport with a semitransparent mask. */
  <Background>
    <Card>
      {children}
    </Card>
  </Background>;
