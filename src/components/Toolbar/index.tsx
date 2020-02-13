import React from 'react';
import './index.scss';

interface Props {
  title: string;
  score: string;
  buttonIcon: string;
  buttonOnClick: Function;
}

export default ({ title, score, buttonIcon, buttonOnClick }: Props) => (
  <header className='toolbar'>
    <h1>{title}</h1>
    <p>{score}</p>
    <div>
      <button onClick={() => buttonOnClick()}>
        <span className='material-icons'>{buttonIcon}</span>
      </button>
    </div>
  </header>
);
