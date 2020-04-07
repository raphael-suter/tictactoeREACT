import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import IconButton from '.';

const setup = (onClick: () => void) => shallow(<IconButton icon='delete' onClick={onClick} />);

describe('IconButton', () => {
  test('Renders correctly.', () => {
    const wrapper = setup(null);
  });

  test('Fires click events.', () => {
    const onClick = jasmine.createSpy();
    setup(onClick).simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
