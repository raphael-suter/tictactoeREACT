import React from 'react';
import './index.scss';
import Props from './Props';

export default ({ icon, onClick }: Props) => (
  <button className='iconbutton' onClick={onClick}>
    <span className='iconbutton__icon material-icons'>{icon}</span>
  </button>
);
