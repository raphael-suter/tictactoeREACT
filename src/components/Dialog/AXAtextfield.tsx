import createAXAInputTextReact from '@axa-ch/input-text/lib/index.react';
import { createElement } from 'react';
import styled from 'styled-components';

const AXAtextfield = styled(createAXAInputTextReact(createElement))`
  display: block;
  margin-bottom: 0.6rem;
`;

export default AXAtextfield;
