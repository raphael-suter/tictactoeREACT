import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ content, onClick }: Props) => (
  <div className='board-field'>
    <button onClick={onClick} aria-label='field'>{content}</button>
  </div>
);
