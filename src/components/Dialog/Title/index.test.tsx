import { shallow } from 'enzyme';
import React from 'react';
import Title from '.';

const setup = (text: string) => shallow(<Title text={text} />);

describe('Title', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup(null);
    expect(wrapper).toHaveLength(1);
  });

  test('Displays text.', () => {
    const expectedText = 'qwertz';
    const wrapper = setup(expectedText);
    const receivedText = wrapper.text();

    expect(receivedText).toBe(expectedText);
  });
});
