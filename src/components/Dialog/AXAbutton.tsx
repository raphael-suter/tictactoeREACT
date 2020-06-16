import createAXAButtonReact from "@axa-ch/button/lib/index.react";
import { createElement } from "react";
import styled from "styled-components";

const AXAbutton = styled(createAXAButtonReact(createElement, "ttt"))`
  margin-top: 0.6rem;
`;

export default AXAbutton;
