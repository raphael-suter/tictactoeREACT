import { shallow } from 'enzyme';
import React from 'react';
import Page from '.';
import Player from '../../model/Player';
import DarkTheme from '../../themes/DarkTheme';
import LightTheme from '../../themes/LightTheme';

const setup = (changes = {}) => {
  const wrapper = shallow<Page>(<Page />);
  wrapper.setState(changes);

  return wrapper;
}

describe('Page', () => {
  test('Renders without crashing.', () => {
    const wrapper = setup();
    expect(wrapper).toHaveLength(1);
  });

  test('Uses LightTheme as default theme.', () => {
    const wrapper: any = setup();
    const theme = wrapper.props().theme;

    expect(theme).toBe(LightTheme);
  });

  test('Is abel to switch to DarkTheme.', () => {
    const wrapper: any = setup({ darkMode: true });
    const theme = wrapper.props().theme;

    expect(theme).toBe(DarkTheme);
  });

  test('Displays score in correct format.', () => {
    const wrapper = setup({ players: [new Player('xx'), new Player('oo')] });
    const receivedScore = wrapper.childAt(1).props().score;

    expect(receivedScore).toBe('xx 0:0 oo');
  });

  test('Theme button calls correct function.', () => {
    const wrapper = setup();
    const spy = spyOn(wrapper.instance(), '_switchTheme');

    wrapper.instance().forceUpdate();
    wrapper.childAt(1).childAt(0).simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Delete button calls correct function.', () => {
    const wrapper = setup();
    const spy = spyOn(wrapper.instance(), '_restart');

    wrapper.instance().forceUpdate();
    wrapper.childAt(1).childAt(1).simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Board has nine children.', () => {
    const wrapper = setup();
    const children = wrapper.childAt(2).children().length;

    expect(children).toBe(9);
  });

  test('Fields display correct text.', () => {
    const wrapper = setup();
    let fields = wrapper.instance().state.fields;

    wrapper.setState({
      fields: fields.map((item, index) => {
        item.content = index.toString();
        return item;
      })
    });

    const expected = wrapper.instance().state.fields;
    const received = wrapper.childAt(2).children().map(item => item.props())

    expect(expected).toStrictEqual(received);
  });

  test('Fields call correct function with correct params.', () => {
    spyOn(Page.prototype, '_selectField');
    const wrapper = setup();

    wrapper.childAt(2).children().forEach((item, index) => {
      item.simulate('click');
      expect(Page.prototype._selectField).toHaveBeenLastCalledWith(index);
    });
  });

  test('Displays dialogs only if needed.', () => {
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
    const children = wrapper.childAt(3).children().length;

    expect(children).toBe(3);
  });

  test('TextFields display correct data.', () => {
    const wrapper = setup({ userDialogVisible: true, messageDialogVisible: false, loaderVisible: false });
    let textFields = wrapper.instance().state.textFields;

    wrapper.setState({
      textFields: textFields.map((item, index) => {
        item.label = `l${index.toString()}`;
        item.placeholder = `p${index.toString()}`;
        item.value = `v${index.toString()}`;
        item.isValid = false;

        return item;
      })
    });

    const expected = wrapper.instance().state.textFields;
    const received = wrapper.childAt(3).children().slice(0, 2).map(item => item.props())

    expect(expected).toStrictEqual(received);
  });

  test('TextFields call correct function with correct params.', () => {
    spyOn(Page.prototype, '_onChange');
    const wrapper = setup({ userDialogVisible: true, messageDialogVisible: false, loaderVisible: false });

    wrapper.childAt(3).children().slice(0, 2).forEach((item, index) => {
      item.simulate('change');
      expect(Page.prototype._onChange).toHaveBeenLastCalledWith(index);
    });
  });

  test('Save button calls correct function.', () => {
    const wrapper = setup({ userDialogVisible: true, messageDialogVisible: false, loaderVisible: false });
    const spy = spyOn(wrapper.instance(), '_savePlayers');

    wrapper.instance().forceUpdate();
    wrapper.childAt(3).childAt(2).simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('MessageDialog has two children.', () => {
    const wrapper = setup({ userDialogVisible: false, messageDialogVisible: true, loaderVisible: false });
    const children = wrapper.childAt(3).children().length;

    expect(children).toBe(2);
  });

  test('MessageDialog displays correct message.', () => {
    const expectedMessage = 'qwertz';
    const wrapper = setup({ userDialogVisible: false, message: expectedMessage, messageDialogVisible: true, loaderVisible: false });
    const receivedMessage = wrapper.childAt(3).childAt(0).props().text;

    expect(receivedMessage).toBe(expectedMessage);
  });

  test('Restart button calls correct function.', () => {
    const wrapper = setup({ userDialogVisible: false, messageDialogVisible: true, loaderVisible: false });
    const spy = spyOn(wrapper.instance(), '_restart');

    wrapper.instance().forceUpdate();
    wrapper.childAt(3).childAt(1).simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('LoaderDialog has one child.', () => {
    const wrapper = setup({ userDialogVisible: false, messageDialogVisible: false, loaderVisible: true });
    const children = wrapper.childAt(3).children().length;

    expect(children).toBe(1);
  });
});
