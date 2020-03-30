import React from 'react';
import styled from 'styled-components';
import Props from './Props';

const Label = styled.label`
  display: block;
  margin: 0.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.darkColor};
`;

const Input = styled.input<{ isValid: boolean }>`
  width: 100%;
  display: block;
  margin-top: 0.5rem;
  padding: 0.7rem;
  font-size: 12pt;
  background: ${({ theme }) => theme.lightColor};
  border: 1px solid ${({ isValid, theme }) => (isValid ? theme.mainColor : 'red')};
  border-radius: 0;
  box-sizing: border-box;
`;

export default ({ label, placeholder, value, isValid, onChange }: Props) =>
  <Label>
    {label}
    <Input type='text' placeholder={placeholder} value={value} onChange={onChange} isValid={isValid} />
  </Label>;
