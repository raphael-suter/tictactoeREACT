import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ title, score, children }: Props) => (
  <header className='toolbar'>
    <h1>{title}</h1>
    <p>{score}</p>
    <div>
      {children}
    </div>
  </header>
);
