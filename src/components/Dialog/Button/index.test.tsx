import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Button from '.';

const setup = (onClick: () => void) => shallow(<Button text='ok' onClick={onClick} />);

describe('Button', () => {
  test('Renders correctly.', () => {
    const wrapper = setup(null);
  });

  test('Fires click events.', () => {
    const onClick = jasmine.createSpy();
    setup(onClick).simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
