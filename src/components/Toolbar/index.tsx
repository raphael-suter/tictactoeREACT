import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ title, score, buttonIcon, buttonOnClick }: Props) => (
  <header className='toolbar'>
    <h1>{title}</h1>
    <p>{score}</p>
    <div>
      <button onClick={buttonOnClick}>
        <span className='material-icons'>{buttonIcon}</span>
      </button>
    </div>
  </header>
);
