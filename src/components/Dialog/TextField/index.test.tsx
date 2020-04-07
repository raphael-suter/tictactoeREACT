import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import TextField from '.';

const setup = (onChange: () => void) => shallow(<TextField label='text' placeholder='text' value='text' onChange={onChange} isValid={true} />);

describe('TextField', () => {
  test('Renders correctly.', () => {
    const wrapper = setup(null);
  });

  test('Fires change events.', () => {
    const onChange = jasmine.createSpy();
    setup(onChange).childAt(1).simulate('change');

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
