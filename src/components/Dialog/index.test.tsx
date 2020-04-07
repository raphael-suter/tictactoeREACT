import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Dialog from '.';

describe('Dialog', () => {
  test('Renders correctly.', () => {
    const wrapper = shallow(<Dialog children={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
