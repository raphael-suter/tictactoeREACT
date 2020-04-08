import { shallow } from 'enzyme';
import React from 'react';
import App from '.';
import Player from '../../model/Player';
import DarkTheme from '../../themes/DarkTheme';
import LightTheme from '../../themes/LightTheme';

const setup = (changes = {}) => {
  const wrapper = shallow(<App />);
  wrapper.setState(changes);

  return wrapper;
}

describe('Page', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup();
    expect(wrapper).toHaveLength(1);
  });

  test('Uses LightTheme as default theme.', () => {
    const wrapper = setup();
    const theme = wrapper.props().theme;

    expect(theme).toBe(LightTheme);
  });

  test('Is able to switch to DarkTheme.', () => {
    const wrapper = setup({ darkMode: true });
    const theme = wrapper.props().theme;

    expect(theme).toBe(DarkTheme);
  });

  test('Displays score in correct format.', () => {
    const wrapper = setup({ players: [new Player('xx'), new Player('oo')] });
    const receivedScore = wrapper.childAt(1).props().score;

    expect(receivedScore).toBe('xx 0:0 oo');
  });

  test('Toolbar has two children.', () => {
    const wrapper = setup();
    const children = wrapper.childAt(1).children().length;

    expect(children).toBe(2);
  });

  test('Board has nine children.', () => {
    const wrapper = setup();
    const children = wrapper.childAt(2).children().length;

    expect(children).toBe(9);
  });

  test('Displays Dialogs only if needed.', () => {
    const wrapper = setup({ userDialogVisible: false, messageDialogVisible: false, loaderVisible: false });
    const childrenCountBefore = wrapper.children().length;

    wrapper.setState({
      userDialogVisible: true,
      messageDialogVisible: true,
      loaderVisible: true
    });

    const childrenCountAfter = wrapper.children().length;
    expect(childrenCountAfter - childrenCountBefore).toBe(3);
  });

  test('UserDialog has three children.', () => {
    const wrapper = setup({ userDialogVisible: true, messageDialogVisible: false, loaderVisible: false });
    const textFields = wrapper.childAt(3).children().length;

    expect(textFields).toBe(3);
  });

  test('MessageDialog has two children.', () => {
    const wrapper = setup({ userDialogVisible: false, messageDialogVisible: true, loaderVisible: false });
    const textFields = wrapper.childAt(3).children().length;

    expect(textFields).toBe(2);
  });

  test('LoaderDialog has one child.', () => {
    const wrapper = setup({ userDialogVisible: false, messageDialogVisible: false, loaderVisible: true });
    const textFields = wrapper.childAt(3).children().length;

    expect(textFields).toBe(1);
  });

  test('Is able to display messages.', () => {
    const expectedMessage = 'qwertz';
    const wrapper = setup({ userDialogVisible: false, message: expectedMessage, messageDialogVisible: true, loaderVisible: false });
    const receivedMessage = wrapper.childAt(3).childAt(0).props().text;

    expect(receivedMessage).toBe(expectedMessage);
  });
});
