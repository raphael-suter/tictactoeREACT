import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Field from '.';

const setup = (onClick: () => void) => shallow(<Field content='X' onClick={onClick} />);

describe('Field', () => {
  test('Renders correctly.', () => {
    const wrapper = setup(null);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Fires click events.', () => {
    const onClick = jasmine.createSpy();
    setup(onClick).childAt(0).simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
