import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ icon, onClick }: Props) => (
  <button className='toolbar-button' onClick={onClick}>
    <span className='material-icons'>{icon}</span>
  </button>
);
