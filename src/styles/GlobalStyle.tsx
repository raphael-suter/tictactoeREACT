import { createGlobalStyle } from 'styled-components';
import Theme from './themes/Theme';

export default createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    font-family: "Source Sans Pro", sans-serif;
  }

  body {
    background: ${({ theme }) => theme.lightColor};
  }
`;
