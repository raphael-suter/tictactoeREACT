import { shallow } from 'enzyme';
import React from 'react';
import TextField from '.';

const setup = (label: string, placeholder: string, value: string, isValid: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void) => shallow(<TextField label={label} placeholder={placeholder} value={value} onChange={onChange} isValid={isValid} />);

describe('TextField', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup(null, null, null, null, null);
    expect(wrapper).toHaveLength(1);
  });

  test('Displays label.', () => {
    const expectedText = 'qwertz';
    const wrapper = setup(expectedText, null, null, null, null);
    const receivedText = wrapper.text();

    expect(receivedText).toBe(expectedText);
  });

  test('Displays placeholder.', () => {
    const expectedText = 'qwertz';
    const wrapper = setup(null, expectedText, null, null, null);
    const receivedText = wrapper.find("[type='text']").props().placeholder;

    expect(receivedText).toBe(expectedText);
  });

  test('Displays value.', () => {
    const expectedText = 'qwertz';
    const wrapper = setup(null, null, expectedText, null, null);
    const receivedText = wrapper.find("[type='text']").props().value;

    expect(receivedText).toBe(expectedText);
  });

  test('Displays if valid.', () => {
    const wrapper = setup(null, null, null, true, null);
    const isValid = wrapper.find("[type='text']").prop('isValid');

    expect(isValid).toBeTruthy();
  });

  test('Displays if invalid.', () => {
    const wrapper = setup(null, null, null, false, null);
    const isValid = wrapper.find("[type='text']").prop('isValid');

    expect(isValid).toBeFalsy();
  });

  test('Fires change event.', () => {
    const onChange = jasmine.createSpy();
    const wrapper = setup(null, null, null, null, onChange);

    wrapper.find("[type='text']").simulate('change');

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
