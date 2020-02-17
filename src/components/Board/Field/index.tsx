import React from 'react';
import './index.scss';

interface Props {
  content: string;
  onClick: Function;
}

export const Field = ({ content, onClick }: Props) => (
  <div className='field'>
    <button onClick={() => onClick()}>{content}</button>
  </div>
);
