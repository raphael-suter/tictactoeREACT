import React from 'react';
import styled from 'styled-components';
import Props from './Props';

const Parent = styled.main`
  padding: 7% 1.2rem 1.2rem;
`;

const Grid = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 0.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  box-shadow: 0 0 2px 0 ${({ theme }) => theme.shadowColor};
  background: ${({ theme }) => theme.lightColor};
  flex: 1;
`;

export default ({ children }: Props) =>
  /* Two nested boxes are necessary to make sure that there's always some spacing around the inner one. 
  (grid's margin is set to auto) */
  <Parent>
    <Grid>{children}</Grid>
  </Parent>;
