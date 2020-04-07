import { shallow } from 'enzyme';
import React from 'react';
import Field from '.';

const setup = (onClick: () => void) => shallow(<Field content='X' onClick={onClick} />);

describe('Field', () => {
  test('Renders correctly.', () => {
    const wrapper = setup(null);
  });

  test('Fires click events.', () => {
    const onClick = jasmine.createSpy();
    setup(onClick).childAt(0).simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
