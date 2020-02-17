import React from 'react';
import './index.scss';

interface Props {
  text: string;
}

export const Title = ({ text }: Props) => (
  <span className='title'>{text}</span>
);
