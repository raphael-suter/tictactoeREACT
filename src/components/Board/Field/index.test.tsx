import { shallow } from 'enzyme';
import React from 'react';
import Field from '.';

const setup = (content: string, onClick: () => void) => shallow(<Field content={content} onClick={onClick} />);

describe('Field', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup(null, null);
    expect(wrapper).toHaveLength(1);
  });

  test('Displays text.', () => {
    const expectedText = 'qwertz';
    const wrapper = setup(expectedText, null);
    const receivedText = wrapper.childAt(0).text();

    expect(receivedText).toBe(expectedText);
  });

  test('Fires click event.', () => {
    const onClick = jasmine.createSpy();
    const wrapper = setup(null, onClick);

    wrapper.childAt(0).simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
