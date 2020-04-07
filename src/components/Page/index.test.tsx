import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import App from '.';

const setup = () => shallow(<App />);

describe('Page', () => {
  test('Renders correctly.', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Shows Dialogs.', () => {
    const wrapper = setup();

    wrapper.setState({
      userDialogVisible: false,
      messageDialogVisible: false,
      loaderVisible: false
    });

    const childrenCountBefore = wrapper.children().length;

    wrapper.setState({
      userDialogVisible: true,
      messageDialogVisible: true,
      loaderVisible: true
    });

    const childrenCountAfter = wrapper.children().length;
    expect(childrenCountAfter - childrenCountBefore).toBe(3);
  });
});

describe('Page, verifyPlayers', () => {
  const wrapper = setup();
  // TODO
});
