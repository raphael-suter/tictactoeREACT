import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ visible, children }: Props) => (
  /* The parent div is used to center the article vertically and horizontally. */
  <div className='dialog' style={{ visibility: visible ? 'visible' : 'hidden' }}>
    <article>
      {children}
    </article>
  </div>
);
