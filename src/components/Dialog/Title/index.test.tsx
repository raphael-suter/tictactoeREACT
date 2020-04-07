import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Title from '.';

describe('Title', () => {
  test('Renders correctly.', () => {
    const wrapper = shallow(<Title text={''}/>);
  });
});
