import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ text }: Props) => (
  <h1 className='title'>{text}</h1>
);
