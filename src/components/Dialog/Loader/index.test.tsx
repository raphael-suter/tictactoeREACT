import { shallow } from 'enzyme';
import React from 'react';
import Loader from '.';

describe('Loader', () => {
  test('Renders without crashing.', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toHaveLength(1);
  });
});
