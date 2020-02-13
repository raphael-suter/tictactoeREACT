import React from 'react';
import './index.scss';

interface Props {
  visible: boolean;
  children: JSX.Element[];
}

const Dialog = ({ visible, children }: Props) => (
  <div className='dialog' style={{ visibility: visible ? 'visible' : 'hidden' }}>
    <form>
      {children}
    </form>
  </div>
);

export { TextField } from './TextField';
export { Button } from './Button';
export default Dialog;
