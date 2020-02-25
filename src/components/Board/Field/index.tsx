import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ content, onClick }: Props) => (
  <div className='field'>
    <button onClick={onClick}>{content}</button>
  </div>
);
