import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ label, placeholder, value, isValid, onChange }: Props) => (
  <label className='textfield'>
    {label}
    <input className={`textfield__input ${isValid ? '' : 'textfield__input--invalid'}`} type='text' placeholder={placeholder} value={value} onChange={onChange} />
  </label>
);
