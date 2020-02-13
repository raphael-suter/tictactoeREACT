import React from 'react';
import './index.scss';

interface Props {
  text: string;
  onClick: Function;
}

export const Button = ({ text, onClick }: Props) => (
  <input type='button' className='button' value={text} onClick={() => onClick()} />
);
