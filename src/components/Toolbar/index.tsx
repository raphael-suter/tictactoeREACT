import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ title, score, children }: Props) => (
  <header className='toolbar'>
    <h1 className='toolbar__title'>{title}</h1>
    <p className='toolbar__score'>{score}</p>
    <div className='toolbar__buttongroup'>
      {children}
    </div>
  </header>
);
