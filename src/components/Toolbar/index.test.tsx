import { shallow } from 'enzyme';
import React from 'react';
import Toolbar from '.';

const setup = (title: string, score: string, children: JSX.Element | JSX.Element[]) => shallow(<Toolbar title={title} score={score} children={children} />);

describe('Dialog', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup(null, null, null);
    expect(wrapper).toHaveLength(1);
  });

  test('Displays title.', () => {
    const expectedText = 'qwertz';
    const wrapper = setup(expectedText, null, null);
    const receivedText = wrapper.childAt(0).text();

    expect(receivedText).toBe(expectedText);
  });

  test('Displays score.', () => {
    const expectedText = 'qwertz';
    const wrapper = setup(null, expectedText, null);
    const receivedText = wrapper.childAt(1).text();

    expect(receivedText).toBe(expectedText);
  });

  test('Displays children.', () => {
    const wrapper = setup(null, null, <h1 data-test='id'></h1>);
    const children = wrapper.find("[data-test='id']");

    expect(children).toHaveLength(1);
  });
});
