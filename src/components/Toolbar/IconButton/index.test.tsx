import { shallow } from 'enzyme';
import React from 'react';
import Button from '.';

const setup = (icon: string, onClick: () => void) => shallow(<Button icon={icon} onClick={onClick} />);

describe('IconButton', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup(null, null);
    expect(wrapper).toHaveLength(1);
  });

  test('Displays icon.', () => {
    const expectedIcon = 'qwertz';
    const wrapper = setup(expectedIcon, null);
    const receivedIcon = wrapper.text();

    expect(receivedIcon).toBe(expectedIcon);
  });

  test('Fires click event.', () => {
    const onClick = jasmine.createSpy();
    const wrapper = setup(null, onClick);

    wrapper.simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
