import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Board from '.';

describe('Board', () => {
  test('Renders correctly.', () => {
    const wrapper = shallow(<Board children={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
