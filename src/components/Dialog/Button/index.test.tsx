import { shallow } from 'enzyme';
import React from 'react';
import Button from '.';

const setup = (text: string, onClick: () => void) => shallow(<Button text={text} onClick={onClick} />);

describe('Button', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup(null, null);
    expect(wrapper).toHaveLength(1);
  });

  test('Displays text.', () => {
    const expectedText = 'qwertz';
    const wrapper = setup(expectedText, null);
    const receivedText = wrapper.text();

    expect(receivedText).toBe(expectedText);
  });

  test('Fires click event.', () => {
    const onClick = jasmine.createSpy();
    const wrapper = setup(null, onClick);

    wrapper.simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
