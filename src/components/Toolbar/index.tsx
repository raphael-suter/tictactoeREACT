import React from 'react';
import './index.scss';

interface Props {
  title: string;
  score: string;
  buttonIcon: string;
}

export default ({ title, score, buttonIcon }: Props) => (
  <header>
    <h1>{title}</h1>
    <p>{score}</p>
    <button >
      <span className='material-icons'>{buttonIcon}</span>
    </button>
  </header>
);
