import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ children }: Props) => (
  /* The parent div is used to center the article vertically and horizontally and to cover the whole viewport with a semitransparent mask. */
  <div className='dialog'>
    <article>
      {children}
    </article>
  </div>
);
