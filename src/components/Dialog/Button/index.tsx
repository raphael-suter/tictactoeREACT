import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ text, onClick }: Props) => (
  <button className='dialog-button' onClick={onClick}>{text}</button>
);
