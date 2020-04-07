import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Toolbar from '.';

describe('Toolbar', () => {
  test('Renders correctly.', () => {
    const wrapper = shallow(<Toolbar title='Title' score='Score' children={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
