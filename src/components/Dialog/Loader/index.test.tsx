import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Loader from '.';

describe('Loader', () => {
  test('Renders correctly.', () => {
    const wrapper = shallow(<Loader />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
