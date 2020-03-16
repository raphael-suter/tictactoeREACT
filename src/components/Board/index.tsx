import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ children }: Props) => (
  /* Two nested boxes are necessary to make sure that there's always some spacing around the inner one. 
  (grid's margin is set to auto) */
  <main className='board'>
    <div className='board__grid'>
      {children}
    </div>
  </main>
);
