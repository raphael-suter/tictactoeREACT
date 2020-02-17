import React from 'react';
import './index.scss';

interface Props {
  label: String;
  placeholder: string;
  reference: React.RefObject<HTMLInputElement>;
}

export const TextField = ({ label, placeholder, reference }: Props) => (
  <label className='textfield'>
    {label}
    <input type='text' placeholder={placeholder} ref={reference} />
  </label>
);
