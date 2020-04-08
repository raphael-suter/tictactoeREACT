import { shallow } from 'enzyme';
import React from 'react';
import Dialog from '.';

const setup = (children: JSX.Element | JSX.Element[]) => shallow(<Dialog children={children} />);

describe('Dialog', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup(null);
    expect(wrapper).toHaveLength(1);
  });

  test('Displays children.', () => {
    const wrapper = setup(<h1 data-test='id'></h1>);
    const children = wrapper.find("[data-test='id']");

    expect(children).toHaveLength(1);
  });
});
