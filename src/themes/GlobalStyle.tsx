import { createGlobalStyle } from 'styled-components';
import Template from './Template';

export default createGlobalStyle<{ theme: Template }>`
  * {
    margin: 0;
    padding: 0;
    font-family: "Source Sans Pro", sans-serif;
  }

  body {
    background: ${({ theme }) => theme.lightColor};
  }
`;
