import React from 'react';
import styled, { keyframes } from 'styled-components';

const size = '50px';
const thickness = '0.5rem';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: ${size};
  height: ${size};
  margin: 0.6rem auto;
  border: ${thickness} solid ${({ theme }) => theme.mainColor};
  border-top: ${thickness} solid ${({ theme }) => theme.mediumColor};
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;

export default () => <Loader />;
