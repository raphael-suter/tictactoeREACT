import React from 'react';
import './index.scss';

interface Props {
  children: JSX.Element[];
}

const Board = ({ children }: Props) => (
  <main className='board'>
    <div className='grid'>
      {children}
    </div>
  </main>
);

export { Field } from './Field';
export default Board;
