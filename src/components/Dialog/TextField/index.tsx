import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ label, placeholder, value, isValid, onChange }: Props) => (
  <label className='dialog-textfield'>
    {label}
    <input className={isValid ? '' : 'empty'} type='text' placeholder={placeholder} value={value} onChange={onChange} />
  </label>
);
